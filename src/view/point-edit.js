import {CITIES, OFFERS} from '../const.js';
import {formatDateWithSlashes, formatTime} from '../utils/date';
import {getRandomInteger} from '../utils/common';
import {createDescription, getTypesByCategory, getAvailableOffers} from '../mock/point';
import SmartView from "./smart.js";


const EMPTY_POINT = {
  type: `Flight`,
  city: ``,
  price: ``,
  startDate: null,
  endDate: null,
  offers: [],
  destination: {},
  isFavorite: false
};


const createTypeList = (pointTypes) => {

  return pointTypes.map((pointType) => {
    const pointTypeLowerCase = pointType.toLowerCase();
    return (
      `<div class="event__type-item">
        <input id="event-type-${pointTypeLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${pointTypeLowerCase}>
        <label class="event__type-label  event__type-label--${pointTypeLowerCase}" for="event-type-${pointTypeLowerCase}-1">${pointType}        </label>
      </div>`);
  }).join(``);
};

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
          ${createTypeList(getTypesByCategory(`transfers`))}
        </fieldset>
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>
          ${createTypeList(getTypesByCategory(`activities`))}
        </fieldset>
      </div>
  </div>`
  );
};


const createCitiesList = (cities) => {

  return cities.map((city) =>
    `< option value = "${city}" ></option > `).join(``);
};


const createCityTemplate = (city, citiesArray, type) => {
  const pointTypeString = getTypesByCategory(`activities`).includes(type) ? `${type} in ` : `${type} to`;

  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${pointTypeString}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
    <datalist id="destination-list-1">
      ${createCitiesList(citiesArray)}
    </datalist>
  </div>`
  );
};


const createDatesTemplate = (startDate, endDate) => {

  return (
    `<div class="event__field-group  event__field-group--time">
  <label class="visually-hidden" for="event-start-time-1">
    From
      </label>
  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateWithSlashes(startDate)} ${formatTime(startDate)}">
    &mdash;
      <label class="visually-hidden" for="event-end-time-1">
      To
      </label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateWithSlashes(endDate)} ${formatTime(endDate)}">
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


const createOffersList = (offers, type) => {
  return getAvailableOffers(type).map((offer) =>
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.category}-1" type="checkbox" name="event-offer-${offer.category}" ${offers.includes(offer) ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${offer.category}-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </label>
      </div>`).join(``);
};


const createOffersTemplate = (offersArray, type) => {

  return (
    `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${createOffersList(offersArray, type)}
          </div>
        </section>`
  );
};


const createPhotosTemplate = (photosArray) => {

  return photosArray.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``);
};


const createPointEditTemplate = (point) => {

  const {
    type,
    city,
    price,
    startDate,
    endDate,
    offers,
    destination,
    isFavorite
  } = point;

  return (
    `<div>
            <form class="trip-events__item  event  event--edit" action="#" method="post">
              <header class="event__header">
                ${createTypeTemplate(type)}
                ${createCityTemplate(city, CITIES, type)}
                ${createDatesTemplate(startDate, endDate)}
                ${createPriceTemplate(price)}
                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                <button class="event__reset-btn" type="reset">Cancel</button>
                <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox"
                  name="event-favorite" ${isFavorite ? `checked` : ``} />
                <label class="event__favorite-btn" for="event-favorite-1">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
                  </svg>
                </label>
              </header>
              <section class="event__details">
                ${createOffersTemplate(offers, type)}
                <section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  <p class="event__destination-description">${destination.description}.</p>

                  <div class="event__photos-container">
                    <div class="event__photos-tape">
                      ${createPhotosTemplate(destination.photos)}
                    </div>
                  </div>
                </section>
              </section>
            </form>
          </div>`
  );
};

export default class PointEdit extends SmartView {

  constructor(point = EMPTY_POINT) {
    super();
    this._data = point;
    this._submitHandler = this._submitHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._setFavoriteClickHandler();
    this._setTypeChangeHandler();
    this._setDestinationChangeHandler();
    this._setOffersChangeHandler();
  }

  _getTemplate() {
    return createPointEditTemplate(this._data);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit(this._data);
  }

  setSubmitHandler(callback) {
    this._callback.submit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._submitHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this.updateData({isFavorite: !this._data.isFavorite});
  }

  _setFavoriteClickHandler() {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    const label = this.getElement().querySelector(`label[for=${evt.target.id}]`);
    this.updateData({type: label.textContent.trim()});
  }

  _setTypeChangeHandler() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._typeChangeHandler);
  }

  _destinationChangeHandler(evt) {
    if (evt.target.value !== this._data.city) {
      this.updateData({
        city: evt.target.value,
        destination: {
          description: createDescription(),
          photos: new Array(getRandomInteger(1, 5)).fill().map(() =>
            `http://picsum.photos/248/152?r=${Math.random()}`)
        }
      });
    }
  }

  _setDestinationChangeHandler() {
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
  }

  _offersChangeHandler(evt) {
    evt.preventDefault();
    this._data.offers = [];
    const selectedOffers = this.getElement().querySelectorAll(`.event__offer-checkbox:checked`);
    selectedOffers.forEach((offer) => {
      let title = offer.parentElement.querySelector(`.event__offer-title`).textContent;
      this._data.offers.push(OFFERS.find((item) => item.title === title));
    });
    this.updateData({offers: this._data.offers});
  }

  _setOffersChangeHandler() {
    this.getElement().querySelector(`.event__available-offers`).addEventListener(`change`, this._offersChangeHandler);
  }

  restoreHandlers() {
    this._setFavoriteClickHandler();
    this._setTypeChangeHandler();
    this._setDestinationChangeHandler();
    this._setOffersChangeHandler();
    this.setSubmitHandler(this._callback.submit);
  }

  reset(point) {
    this.updateData(point);
  }
}
