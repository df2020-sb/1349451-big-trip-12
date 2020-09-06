import {render, RenderPosition, remove, replace} from './utils/render';
import {createPoint} from './mock/point';
import TripContainer from './view/trip-container';
import TripInfo from './view/trip-info';
import Menu from './view/menu';
import FilterPresenter from './presenter/filter';
import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import StatsView from './view/statistics';
import {MenuItem} from "./const.js";

const POINTS_COUNT = 30;

let tripInfoComponent = null;
let statsComponent = null;

const renderTripInfo = (points) => {
  if (!points[0]) {
    return;
  }
  const prevTripInfoComponent = tripInfoComponent;
  tripInfoComponent = new TripInfo(points);

  if (!prevTripInfoComponent) {
    render(header, tripInfoComponent, RenderPosition.AFTERBEGIN);
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

const header = document.querySelector(`.trip-main`);
const controls = document.querySelector(`.trip-controls`);
const addButton = document.querySelector(`.trip-main__event-add-btn`);
const menu = new Menu();

const main = document.querySelector(`.page-main .page-body__container`);
const tripContainer = new TripContainer();


const tripPresenter = new TripPresenter(tripContainer, pointsModel, filterModel, renderTripInfo);
const filterPresenter = new FilterPresenter(controls, filterModel);

const handleMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statsComponent);
      statsComponent = null;
      render(main, tripContainer, RenderPosition.BEFOREEND);
      tripPresenter.init();
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      remove(tripContainer);
      statsComponent = new StatsView(pointsModel.getPoints());
      render(main, statsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

renderTripInfo(points);
render(controls, menu, RenderPosition.AFTERBEGIN);
render(main, tripContainer, RenderPosition.BEFOREEND);
menu.setMenuClickHandler(handleMenuClick);

addButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  if (statsComponent) {
    menu.resetMenu();
  }
  tripPresenter.createNewPoint();
});

tripPresenter.init();
filterPresenter.init();
