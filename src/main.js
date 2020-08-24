import {render, RenderPosition, remove, replace} from './utils/render';
import {createPoint} from './mock/point';
import TripInfo from './view/trip-info';
import Menu from './view/menu';
import Filter from './view/filters';
import Trip from './presenter/trip-presenter';

const POINTS_COUNT = 30;
let tripInfoComponent = null;

const renderTripInfo = (points) => {
  if (!points[0]) {
    return;
  }
  const prevTripInfoComponent = tripInfoComponent;
  tripInfoComponent = new TripInfo(points);

  if (prevTripInfoComponent === null) {
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

const main = document.querySelector(`.trip-main`);
const controls = document.querySelector(`.trip-controls`);
const tripContainer = document.querySelector(`.trip-events`);
const tripPresenter = new Trip(tripContainer, points, renderTripInfo);

renderTripInfo(points);
render(controls, new Filter(), RenderPosition.AFTERBEGIN);
render(controls, new Menu(), RenderPosition.AFTERBEGIN);
tripPresenter.init();
