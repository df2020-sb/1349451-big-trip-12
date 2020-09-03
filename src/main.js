import {render, RenderPosition, remove, replace} from './utils/render';
import {createPoint} from './mock/point';
import TripInfo from './view/trip-info';
import Menu from './view/menu';
import FilterPresenter from './presenter/filter';
import Trip from './presenter/trip-presenter';
import PointsModel from './model/points';
import FilterModel from './model/filter';

const POINTS_COUNT = 30;

let tripInfoComponent = null;

const renderTripInfo = (points) => {
  if (!points[0]) {
    return;
  }
  const prevTripInfoComponent = tripInfoComponent;
  tripInfoComponent = new TripInfo(points);

  if (!prevTripInfoComponent) {
    render(main, tripInfoComponent, RenderPosition.AFTERBEGIN);
    return;
  }

  replace(tripInfoComponent, prevTripInfoComponent);
  remove(prevTripInfoComponent);
};

const points = new Array(POINTS_COUNT)
  .fill()
  .map(createPoint)
  .sort((a, b) => a.startDate - b.startDate);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const main = document.querySelector(`.trip-main`);
const controls = document.querySelector(`.trip-controls`);
const tripContainer = document.querySelector(`.trip-events`);
const filterPresenter = new FilterPresenter(controls, filterModel);
const tripPresenter = new Trip(tripContainer, pointsModel, filterModel, renderTripInfo);

renderTripInfo(points);
render(controls, new Menu(), RenderPosition.AFTERBEGIN);
filterPresenter.init();
tripPresenter.init();

const addButton = document.querySelector(`.trip-main__event-add-btn`);
addButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createNewPoint();
});
