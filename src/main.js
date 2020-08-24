import {render, RenderPosition} from './utils/render';
import {createPoint} from './mock/point';
import TripInfo from './view/trip-info';
import Menu from './view/menu';
import Filter from './view/filters';
import Trip from './presenter/trip-presenter';

const POINTS_COUNT = 30;

const renderTripInfo = (container, points) => {
  if (!points[0]) {
    return;
  }
  render(container, new TripInfo(points), RenderPosition.AFTERBEGIN);
};

const points = new Array(POINTS_COUNT)
  .fill()
  .map(createPoint)
  .sort((a, b) => a.startDate - b.startDate);

export const main = document.querySelector(`.trip-main`);
const controls = document.querySelector(`.trip-controls`);
const tripContainer = document.querySelector(`.trip-events`);
const tripPresenter = new Trip(tripContainer, points);

renderTripInfo(main, points);
render(controls, new Filter(), RenderPosition.AFTERBEGIN);
render(controls, new Menu(), RenderPosition.AFTERBEGIN);
tripPresenter.init();
