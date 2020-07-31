import {createTripInfoTemplate} from './view/trip-info';
import {createMenuTemplate} from './view/menu';
import {createFiltersTemplate} from './view/filters';
import {createSortTemplate} from './view/sort';
import {createEventEditTemplate} from './view/event-edit';
import {createDaysListTemplate} from './view/days-list';
import {createDayTemplate} from './view/day';
import {createDayInfoTemplate} from './view/day-info';
import {createEventsListTemplate} from './view/events-list';
import {createEventTemplate} from './view/event';

const EVENTS_COUNT = 3;

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

const render = (container, position, template) => {
  container.insertAdjacentHTML(position, template);
};

render(tripMainElement, `afterbegin`, createTripInfoTemplate());
render(tripControlsElement, `afterbegin`, createFiltersTemplate());
render(tripControlsElement, `afterbegin`, createMenuTemplate());
render(tripEventsElement, `beforeend`, createSortTemplate());
render(tripEventsElement, `beforeend`, createEventEditTemplate());
render(tripEventsElement, `beforeend`, createDaysListTemplate());

const daysListElement = document.querySelector(`.trip-days`);
render(daysListElement, `beforeend`, createDayTemplate());

const dayElement = document.querySelector(`.trip-days li`);
render(dayElement, `beforeend`, createDayInfoTemplate());
render(dayElement, `beforeend`, createEventsListTemplate());

const eventsListElement = document.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(eventsListElement, `beforeend`, createEventTemplate());
}

