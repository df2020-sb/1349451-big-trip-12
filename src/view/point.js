
import AbstractView from './abstract';
import moment from "moment";
import {POINT_TYPES} from '../const';
import {capitalizeFirstLetter} from '../utils/common';

const createPointTemplate = (point) => {

  const {type, destination, price, startDate, endDate, offers} = point;
  const capitalizedType = capitalizeFirstLetter(type);
  const pointTypeString = POINT_TYPES.activities.includes(type) ? `${capitalizedType} in ` : `${capitalizedType} to`;

  const formattedStartDate = moment(startDate).format(`YYYY-MM-DD`);
  const formattedStartTime = moment(startDate).format(`HH:mm`);
  const formattedEndtDate = moment(endDate).format(`YYYY-MM-DD`);
  const formattedEndTime = moment(endDate).format(`HH:mm`);

  const duration = moment.duration(endDate - startDate);
  const days = duration.days();
  const daysString = days > 0 ? `${(`0` + days.toString()).slice(-2)}D ` : ``;
  const hours = duration.hours();
  const hoursString = hours > 0 ? `${(`0` + hours.toString()).slice(-2)}H ` : ``;
  const minutes = duration.minutes();
  const minutesString = minutes > 0 ? `${(`0` + minutes.toString()).slice(-2)}M` : ``;

  const createOffersList = (pointOffers) => {
    return pointOffers.slice(0, 3).map((offer) =>
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&nbsp;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </li>`).join(``);
  };

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${pointTypeString} ${destination.name}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${formattedStartDate}T${formattedStartTime}">${formattedStartTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${formattedEndtDate}T${formattedEndTime}">${formattedEndTime}</time>
        </p>
        <p class="event__duration">${daysString}${hoursString}${minutesString}</p>
      </div >

  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${price}</span>
  </p>

  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${createOffersList(offers)}
  </ul>

  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
    </div>
  </li> `
  );
};

export default class Point extends AbstractView {

  constructor(point) {
    super();
    this._point = point;
    this._editControlClickHandler = this._editControlClickHandler.bind(this);
  }

  _getTemplate() {
    return createPointTemplate(this._point);
  }

  _editControlClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditControlClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editControlClickHandler);
  }
}
