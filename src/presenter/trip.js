import {SortType} from "../const.js";
import {render, RenderPosition, replace} from '../utils/render';
import {sortByPrice, sortByTime} from '../utils/sort';
import Sort from '../view/sort';
import Day from '../view/day';
import DaysList from '../view/days-list';
import Point from '../view/point';
import PointEdit from '../view/point-edit';
import NoPoints from '../view/no-points';


const createDay = () => {
  return {
    date: null,
    points: []
  };
};

const createDaysArray = (points) => {
  const daysArray = [];
  let newDay = createDay();
  let startDate = points[0].startDate.getDate();

  points.forEach((point) => {
    if (point.startDate.getDate() !== startDate) {
      newDay.date = point.startDate;
      daysArray.push(newDay);
      newDay = createDay();
      startDate = point.startDate.getDate();
    }
    newDay.points.push(point);
  });

  return daysArray;
};

export default class Trip {

  constructor(container, points) {
    this._points = [...points];
    this._receivedPoints = [...points];

    this._container = container;
    this._sortComponent = new Sort();
    this._daysListComponent = new DaysList();
    this._noPointsComponent = new NoPoints();
    this._currentSortType = SortType.DEFAULT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._renderedPoints = [];
  }
  _renderSort() {
    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeSelectHandler(this._handleSortTypeChange);
  }

  _renderDaysList() {
    render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(pointsContainer, point) {
    const pointComponent = new Point(point);
    const pointEditComponent = new PointEdit(point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const removeEscListener = () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    pointComponent.setRemoveEvtHandler(removeEscListener);

    pointComponent.setRollupClickHandler(() => {
      replacePointToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    pointEditComponent.setSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._renderedPoints.push(pointComponent);
    render(pointsContainer, pointComponent, RenderPosition.BEFOREEND);
  }

  _renderPoints(dayComponent, points) {
    const pointsContainer = dayComponent.getElement().querySelector(`.trip-events__list`);
    points.forEach((point) => this._renderPoint(pointsContainer, point));
  }

  _renderSortedPoints() {
    const dayComponent = new Day();
    render(this._daysListComponent, dayComponent, RenderPosition.BEFOREEND);
    this._renderPoints(dayComponent, this._points);
  }

  _renderDays() {
    const daysArray = createDaysArray(this._points);
    let dayNumber = 0;
    daysArray.forEach((day) => {
      const dayComponent = new Day(day.date, ++dayNumber);
      render(this._daysListComponent, dayComponent, RenderPosition.BEFOREEND);
      this._renderPoints(dayComponent, day.points);
    });
  }

  _handleSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    this._daysListComponent.getElement().innerHTML = ``;
    this._renderedPoints.forEach((point) => {
      point.removeEvtHandler();
    });

    switch (sortType) {
      case SortType.TIME:
        this._points.sort(sortByTime);
        this._renderSortedPoints();
        break;
      case SortType.PRICE:
        this._points.sort(sortByPrice);
        this._renderSortedPoints();
        break;
      default:
        this._points = [...this._receivedPoints];
        this._renderDays();
    }
    this._currentSortType = sortType;
  }

  init() {

    if (this._points.length === 0) {
      render(this._container, this._noPointsComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    this._renderDaysList();
    this._renderSort();
    this._renderDays();
  }
}
