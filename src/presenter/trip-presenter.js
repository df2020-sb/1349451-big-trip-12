import {SortType} from "../const.js";
import {render, RenderPosition, remove} from '../utils/render';
import {updateArrayItem} from '../utils/common';
import {sortByPrice, sortByTime} from '../utils/sort';
import Sort from '../view/sort';
import Day from '../view/day';
import DaysList from '../view/days-list';
import PointPresenter from './point-presenter';
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
  let currentDay = points[0].startDate.getDate();
  let prevDate = points[0].startDate;

  points.forEach((point) => {
    if (point.startDate.getDate() !== currentDay) {
      newDay.date = prevDate;
      daysArray.push(newDay);
      newDay = createDay();
      currentDay = point.startDate.getDate();
      prevDate = point.startDate;
    }
    newDay.points.push(point);
  });

  return daysArray;
};

export default class Trip {

  constructor(container, points, changeTripInfo) {
    this._points = [...points];
    this._receivedPoints = [...points];
    this._daysArray = [];
    this._renderedDays = [];
    this._pointPresenter = {};
    this._changeTripInfo = changeTripInfo;

    this._container = container;
    this._sortComponent = new Sort();
    this._daysListComponent = new DaysList();
    this._noPointsComponent = new NoPoints();
    this._currentSortType = SortType.DEFAULT;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

  }

  _renderSort() {
    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeSelectHandler(this._handleSortTypeChange);
  }

  _renderDaysList() {
    render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(pointsContainer, point) {
    const pointPresenter = new PointPresenter(pointsContainer, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(dayComponent, points) {
    const pointsContainer = dayComponent.getElement().querySelector(`.trip-events__list`);
    points.forEach((point) => this._renderPoint(pointsContainer, point));
  }

  _renderDay(points, date, index) {
    const dayComponent = new Day(date, index);
    render(this._daysListComponent, dayComponent, RenderPosition.BEFOREEND);
    this._renderedDays.push(dayComponent);
    this._renderPoints(dayComponent, points);
  }

  _renderDays() {
    this._daysArray = createDaysArray(this._points);
    let dayNumber = 0;
    this._daysArray.forEach((day) => {
      this._renderDay(day.points, day.date, ++dayNumber);
    });
  }

  _clearDays() {
    this._renderedDays.forEach((dayComponent) => remove(dayComponent));
    this._renderedDays = [];
    this._pointPresenter = {};
  }

  _handleSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    this._clearDays();

    switch (sortType) {
      case SortType.TIME:
        this._points.sort(sortByTime);
        this._renderDay(this._points);
        break;
      case SortType.PRICE:
        this._points.sort(sortByPrice);
        this._renderDay(this._points);
        break;
      default:
        this._points = [...this._receivedPoints];
        this._renderDays();
    }
    this._currentSortType = sortType;
  }

  _handlePointChange(updatedPoint) {
    this._points = updateArrayItem(this._points, updatedPoint);
    this._receivedPoints = updateArrayItem(this._receivedPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
    this._changeTripInfo(this._points);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  init() {

    if (!this._points.length) {
      render(this._container, this._noPointsComponent, RenderPosition.AFTERBEGIN);
      return;
    }
    this._renderDaysList();
    this._renderSort();
    this._renderDays();
  }
}
