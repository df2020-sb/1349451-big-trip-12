import {render, RenderPosition, remove, replace} from './utils/render';
import TripContainer from './view/trip-container';
import TripInfo from './view/trip-info';
import Menu from './view/menu';
import FilterPresenter from './presenter/filter';
import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import DestinationsModel from './model/destinations';
import OffersModel from './model/offers';
import StatsView from './view/statistics';
import {MenuItem, UpdateType} from './const';
import Api from './api/index';
import Store from './api/store';
import Provider from './api/provider';


const AUTHORIZATION = `Basic kTy9gIdsz23nblwrntb`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip/`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

let tripInfoComponent = null;
let statsComponent = null;

const header = document.querySelector(`.trip-main`);
const controls = document.querySelector(`.trip-controls`);
const addButton = document.querySelector(`.trip-main__event-add-btn`);
const menu = new Menu();

const main = document.querySelector(`.page-main .page-body__container`);
const tripContainer = new TripContainer();

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();


const renderTripInfo = (points) => {
  const prevTripInfoComponent = tripInfoComponent;
  tripInfoComponent = new TripInfo(points);

  if (!prevTripInfoComponent) {
    render(header, tripInfoComponent, RenderPosition.AFTERBEGIN);
    return;
  }

  replace(tripInfoComponent, prevTripInfoComponent);
  remove(prevTripInfoComponent);
};


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


const tripPresenter = new TripPresenter(
    tripContainer,
    pointsModel,
    filterModel,
    destinationsModel,
    offersModel,
    renderTripInfo,
    apiWithProvider
);


const filterPresenter = new FilterPresenter(controls, filterModel, pointsModel);


render(main, tripContainer, RenderPosition.BEFOREEND);


addButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  if (statsComponent) {
    menu.reset();
  }
  tripPresenter.createNewPoint();
});


tripPresenter.init();
filterPresenter.init();


Promise.all([
  apiWithProvider.getPoints(),
  apiWithProvider.getDestinations(),
  apiWithProvider.getOffers()
]).then(([points, destinations, offers]) => {
  destinationsModel.setDestinations(destinations);
  offersModel.setOffers(offers);
  pointsModel.setPoints(UpdateType.INIT, points);
  render(controls, menu, RenderPosition.AFTERBEGIN);
  menu.setClickHandler(handleMenuClick);
  addButton.disabled = false;
}).catch(() => {
  pointsModel.setPoints(UpdateType.INIT, []);
  render(controls, menu, RenderPosition.AFTERBEGIN);
  menu.setClickHandler(handleMenuClick);
  addButton.disabled = true;
});


window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});


window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});


window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
