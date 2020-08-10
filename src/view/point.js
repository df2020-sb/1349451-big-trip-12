import {POINT_TYPES} from '../const.js';
import {formatDateWithDashes, formatTime, formatDuration} from '../utils.js';

export const createPointTemplate = (point) => {

  const {type, city, price, startDate, endDate, duration, offers} = point;
  const pointTypeString = POINT_TYPES.activities.includes(type) ? `${type} in` : `${type} to`;

  const formattedStartDate = formatDateWithDashes(startDate);
  const formattedStartTime = formatTime(startDate);
  const formattedEndtDate = formatDateWithDashes(endDate);
  const formattedEndTime = formatTime(endDate);
  const formattedDuration = formatDuration(duration);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${pointTypeString} ${city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${formattedStartDate}T${formattedStartTime}">${formattedStartTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${formattedEndtDate}T${formattedEndTime}">${formattedEndTime}</time>
        </p>
        <p class="event__duration">${formattedDuration}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offers.slice(0, 3).map((offer) =>
      `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&nbsp;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </li>`).join(``)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};
