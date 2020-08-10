import {render} from './utils.js';
import {createPoint} from './mock/point';
import {createTripInfoTemplate} from './view/trip-info';
import {createMenuTemplate} from './view/menu';
import {createFiltersTemplate} from './view/filters';
import {createSortTemplate} from './view/sort';
import {createDaysListTemplate} from './view/days-list';
import {createPointEditTemplate} from './view/point-edit';

const POINTS_COUNT = 15;

const points = new Array(POINTS_COUNT)
  .fill()
  .map(createPoint)
  .sort((a, b) => a.startDate - b.startDate);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripPointsElement = document.querySelector(`.trip-events`);

render(tripMainElement, `afterbegin`, createTripInfoTemplate(points));
render(tripControlsElement, `afterbegin`, createFiltersTemplate());
render(tripControlsElement, `afterbegin`, createMenuTemplate());
render(tripPointsElement, `beforeend`, createSortTemplate());
render(tripPointsElement, `beforeend`, createDaysListTemplate(points));

const dayContainers = document.querySelectorAll(`.trip-days__item`);
const firstDayPointsList = dayContainers[0].querySelector(`.trip-events__list`);
render(firstDayPointsList, `afterbegin`, createPointEditTemplate(points[0]));
