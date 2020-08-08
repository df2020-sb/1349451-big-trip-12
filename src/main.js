import {formatDateWithDashes, render} from './utils.js';
import {createEvent} from './mock/event';
import {createTripInfoTemplate} from './view/trip-info';
import {createMenuTemplate} from './view/menu';
import {createFiltersTemplate} from './view/filters';
import {createSortTemplate} from './view/sort';
import {createDaysListTemplate} from './view/days-list';
import {createEventEditTemplate} from './view/event-edit';
import {createEventTemplate} from './view/event';

const EVENTS_COUNT = 15;

const events = new Array(EVENTS_COUNT)
  .fill()
  .map(createEvent)
  .sort((a, b) => a.startDate - b.startDate);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);


render(tripMainElement, `afterbegin`, createTripInfoTemplate(events));
render(tripControlsElement, `afterbegin`, createFiltersTemplate());
render(tripControlsElement, `afterbegin`, createMenuTemplate());
render(tripEventsElement, `beforeend`, createSortTemplate());
render(tripEventsElement, `beforeend`, createDaysListTemplate(events));

for (let i = 1; i < events.length; i++) {
  let dayContainer = document.querySelector(`#_${formatDateWithDashes(events[i].startDate)} .trip-events__list`);
  render(dayContainer, `beforeend`, createEventTemplate(events[i]));
}

const firstDayContainer = document.querySelector(`#_${formatDateWithDashes(events[0].startDate)} .trip-events__list`);
render(firstDayContainer, `afterbegin`, createEventEditTemplate(events[0]));
