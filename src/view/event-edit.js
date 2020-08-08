import {CITIES, EVENT_TYPES, OFFERS} from '../const.js';
import {formatDateWithSlashes, formatTime} from '../utils.js';


const createTypeTemplate = (type) => {
  return (
    `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>

    ${EVENT_TYPES.transfers.map((transfer) => {
      const transferLowerCase = transfer.toLowerCase();
      return (
        `<div class="event__type-item">
          <input id="event-type-${transferLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${transferLowerCase}>
          <label class="event__type-label  event__type-label--${transferLowerCase}" for="event-type-${transferLowerCase}-1">${transfer}</label>
        </div>`);
    }).join(``)}

      </fieldset>
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>

    ${EVENT_TYPES.activities.map((activity) => {
      const activityLowerCase = activity.toLowerCase();
      return (
        `<div class="event__type-item">
          <input id="event-type-${activityLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${activityLowerCase}>
          <label class="event__type-label  event__type-label--${activityLowerCase}" for="event-type-${activityLowerCase}-1">${activity}</label>
        </div>`
      );
    }).join(``)}

      </fieldset>
    </div>
  </div>`
  );
};

const createCityTemplate = (city, citiesList, type) => {
  const eventTypeString = EVENT_TYPES.activities.includes(type) ? `${type} in` : `${type} to`;
  return (
    `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
    ${eventTypeString}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
    <datalist id="destination-list-1">
    ${citiesList.map((item) =>
      `<option value="${item}"></option>`).join(``)}
    </datalist>
  </div>`
  );
};

const createDatesTemplate = (startDate, endDate) => {

  const formattedStartDate = formatDateWithSlashes(startDate);
  const formattedStartTime = formatTime(startDate);
  const formattedEndDate = formatDateWithSlashes(endDate);
  const formattedEndTime = formatTime(endDate);

  return (
    `<div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formattedStartDate} ${formattedStartTime}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formattedEndDate} ${formattedEndTime}">
    </div>`
  );
};

const createPriceTemplate = (price) => {

  return (
    `<div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
    </div>`
  );
};

const createOffersTemplate = (offers) => {

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${OFFERS.map((offer) =>
      `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.category}-1" type="checkbox" name="event-offer-${offer.category}" ${offers.includes(offer) ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${offer.category}-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`)}
      </div>
    </section>`
  );
};

export const createEventEditTemplate = (event = {}) => {

  const {
    type = `Flight`,
    city = ``,
    price = ``,
    startDate = null,
    endDate = null,
    offers = [],
    destination = {}
  } = event;

  const typeTemplate = createTypeTemplate(type);
  const cityTemplate = createCityTemplate(city, CITIES, type);
  const datesTemplate = createDatesTemplate(startDate, endDate);
  const priceTemplate = createPriceTemplate(price);
  const offersTemplate = createOffersTemplate(offers);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        ${typeTemplate}
        ${cityTemplate}
        ${datesTemplate}
        ${priceTemplate}
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        ${offersTemplate}
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}.</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${destination.photos.map(() => `<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo">`).join(``)}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};
