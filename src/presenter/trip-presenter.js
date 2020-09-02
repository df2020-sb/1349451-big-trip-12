import {render, RenderPosition, remove} from '../utils/render';
import {sortByPrice, sortByTime} from '../utils/sort';
import Sort from '../view/sort';
import Day from '../view/day';
import DaysList from '../view/days-list';
import PointPresenter from './point-presenter';
import PointNew from './point-new';
import NoPoints from '../view/no-points';
import {SortType, UpdateType, UserAction} from "../const";
import {filter} from "../utils/filter";


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

  newDay.date = prevDate;
  daysArray.push(newDay);
  return daysArray;
};

export default class Trip {

  constructor(container, pointsModel, filterModel, changeTripInfo) {

    this._container = container;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._changeTripInfo = changeTripInfo;

    this._daysArray = [];
    this._renderedDays = [];
    this._pointPresenter = {};
    this._pointNewPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = null;
    this._daysListComponent = new DaysList();
    this._noPointsComponent = new NoPoints();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleAction = this._handleAction.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();

    const filteredPoints = filter[filterType](points);

    switch (this._currentSortType) {

      case SortType.TIME:
        return filteredPoints.sort(sortByTime);

      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints.sort((a, b) => a.startDate - b.startDate);
  }

  createNewPoint() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.ALL, `everything`);

    const dayComponent = new Day();
    render(this._daysListComponent, dayComponent, RenderPosition.AFTERBEGIN);
    const pointsContainer = dayComponent.getElement().querySelector(`.trip-events__list`);
    this._pointNewPresenter = new PointNew(pointsContainer, this._handleAction);
    this._pointNewPresenter.init();
  }

  _renderSort() {

    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new Sort(this._currentSortType);
    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeSelectHandler(this._handleSortTypeChange);

  }

  _renderDaysList() {
    render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(pointsContainer, point) {
    const pointPresenter = new PointPresenter(pointsContainer, this._handleAction, this._handleModeChange);
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
    const points = this._getPoints();
    if (!points.length) {
      render(this._container, this._noPointsComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    this._renderSort();

    if (this._currentSortType !== SortType.DEFAULT) {
      this._renderDay(points);
      return;
    }

    this._daysArray = createDaysArray(points);
    let dayNumber = 0;
    this._daysArray.forEach((day) => {
      this._renderDay(day.points, day.date, ++dayNumber);
    });
  }

  _clearDays({resetSortType = false} = {}) {
    this._renderedDays.forEach((dayComponent) => remove(dayComponent));
    this._renderedDays = [];
    this._pointPresenter = {};

    remove(this._sortComponent);
    remove(this._noPointsComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _handleSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearDays();
    this._renderDays();
  }

  _handleModeChange() {

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleAction(actionType, updateType, update) {

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleUpdate(updateType, update) {

    switch (updateType) {
      case UpdateType.POINT:
        this._pointPresenter[update.id].init(update);
        this._changeTripInfo(this._pointsModel.getPoints());
        break;
      case UpdateType.TRIP:
        this._clearDays();
        this._renderDays();
        this._changeTripInfo(this._pointsModel.getPoints());
        break;
      case UpdateType.ALL:
        this._clearDays({resetSortType: true});
        this._renderDays();
        this._changeTripInfo(this._pointsModel.getPoints());
        break;
    }
  }

  init() {
    this._renderDaysList();
    this._renderDays();
    this._pointsModel.addObserver(this._handleUpdate);
    this._filterModel.addObserver(this._handleUpdate);
  }
}
