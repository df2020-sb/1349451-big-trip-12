/* eslint-disable indent */
import SmartView from './smart';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import moment from 'moment';
import {POINT_TYPES} from '../const';

let currentOffer = {};
let currentDestination = {};

export const renderOffer = (offer) => {
  currentOffer = offer;
};

export const renderDestination = (destination) => {
  currentDestination = destination;
};

const createTypeList = (pointTypes, currentType) => {
  return pointTypes.map((pointType) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${pointType} ${pointType === currentType ? `checked` : ``}>
        <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${(pointType)}</label>
      </div>`);
  }).join(``);
};

const createTypeTemplate = (type) => {
  return (
    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>
          ${createTypeList(POINT_TYPES.transfers, type)}
        </fieldset>
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>
          ${createTypeList(POINT_TYPES.activities, type)}
        </fieldset>
      </div>
  </div>`
  );
};


const createCitiesList = (cities) => {
  return cities.length ? cities.map((city) => `<option value = "${city}"></option>`).join(``) : ``;
};


const createCityTemplate = (city, citiesArray, type) => {
  const pointTypeString = POINT_TYPES.activities.includes(type) ? `${type} in ` : `${type} to`;

  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${pointTypeString}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city ? city : ``}" list="destination-list-1" pattern="${citiesArray.join(`|`)}">
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
  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate ? moment(startDate).format(`DD/MM/YYYY`) : ``} ${startDate ? moment(startDate).format(`HH:mm`) : ``}">
    &mdash;
      <label class="visually-hidden" for="event-end-time-1">
      To
      </label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate ? moment(endDate).format(`DD/MM/YYYY`) : ``} ${endDate ? moment(endDate).format(`HH:mm`) : ``}">
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
      <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
    </div>`
  );
};


const createOffersList = (pointOffers, typeOffer) => {
  return typeOffer.offers.map(({title, price}) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-1" type="checkbox" name="event-offer-${title}" ${pointOffers.find((offer) => offer.title === title) ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${title}-1">
       <span class="event__offer-title">${title}</span>
       &plus;
       &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
     </div>`).join(``);
};


const createOffersTemplate = (pointOffers, typeOffer = {}) => {
  return Object.keys(typeOffer).length && typeOffer.offers.length ? `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
    ${createOffersList(pointOffers, typeOffer)}
  </div>
  </section>` : ``;
};


const createPhotosTemplate = (photosArray = []) => {
  return photosArray.map((photo) => `<img class="event__photo" src = "${photo.src}" alt = "${photo.description}">`).join(``);
};


const createDestinationTemplate = (destination) => {
  return (!destination.name || destination.name === `` ? `` :
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}.</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${createPhotosTemplate(destination.pictures)}
        </div>
      </div>
    </section>`);
};


const createPointEditTemplate = (point, cities, typeOffer = {}, isNewPoint) => {

  const {
    type,
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
          ${createCityTemplate(destination.name, cities, type)}
          ${createDatesTemplate(startDate, endDate)}
          ${createPriceTemplate(price)}
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${isNewPoint ? `Cancel` : `Delete`}</button>
          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox"
            name="event-favorite" ${isFavorite ? `checked` : ``} />
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
            </svg>
          </label>
          ${isNewPoint ? `` : `<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
          </button>`}
        </header>

        ${!Object.keys(typeOffer).length && !Object.keys(destination).length ? `` : `<section class="event__details">
          ${createOffersTemplate(offers, typeOffer)}
          ${createDestinationTemplate(destination)}
          </section>`}
      </form>
  </div>`
  );
};


export default class PointEdit extends SmartView {

  constructor(point, allCities, updateOffers, updateDestination, isNewPoint = false) {
    super();
    this._data = point;
    this._allCities = allCities;
    this._startDatepicker = null;
    this._endDatepicker = null;
    this._updateOffers = updateOffers;
    this._updateDestination = updateDestination;
    this._isNewPoint = isNewPoint;

    this._submitHandler = this._submitHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._closeEditClickHandler = this._closeEditClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);

    this._setFavoriteClickHandler();
    this._setTypeChangeHandler();
    this._setDestinationChangeHandler();
    this._setPriceChangeHandler();
    this._setOffersChangeHandler();
  }

  _getTemplate() {
    this._updateOffers(this._data.type);
    return createPointEditTemplate(this._data, this._allCities, currentOffer, this._isNewPoint);
  }

  _submitHandler(evt) {
    evt.preventDefault();

    if (!this._data.startDate || !this._data.endDate || this._data.destination.name === ``) {
      return;
    }

    this._isNewPoint = false;
    this.destroyPicker(this._startDatepicker);
    this.destroyPicker(this._endDatepicker);
    this._callback.submit(this._data);
  }


  setSubmitHandler(callback) {
    this._callback.submit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._submitHandler);
  }


  _favoriteClickHandler() {
    this.updateData({isFavorite: !this._data.isFavorite}, true);
  }


  _setFavoriteClickHandler() {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }


  _typeChangeHandler(evt) {
    evt.preventDefault();
    const type = this.getElement().querySelector(`label[for= ${evt.target.id}]`).textContent.trim().toLowerCase();
    this.updateData({type});
  }


  _setTypeChangeHandler() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._typeChangeHandler);
  }


  _destinationChangeHandler(evt) {
    if (evt.target.value !== this._data.destination.name && this._allCities.includes(evt.target.value)) {
      this._updateDestination(evt.target.value);
      this.updateData({destination: currentDestination});
    }
  }

  _setDestinationChangeHandler() {
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
  }

  _offersChangeHandler(evt) {
    if (evt.target.tagName === `INPUT`) {
      this._data.offers = [];
      const selectedOffers = this.getElement().querySelectorAll(`.event__offer-checkbox:checked`);
      selectedOffers.forEach((offer) => {
        let title = offer.parentElement.querySelector(`.event__offer-title`).textContent;
        let newOffer = currentOffer.offers.find((item) => item.title === title);
        this._data.offers.push(newOffer);
      });

      this.updateData({offers: this._data.offers}, true);
    }
  }

  _setOffersChangeHandler() {
    if (currentOffer && currentOffer.offers.length) {
      this.getElement().querySelector(`.event__available-offers`).addEventListener(`change`, this._offersChangeHandler);
    }
  }

  _closeEditClickHandler() {
    this._callback.editFormClose();
  }


  setCloseEditClickHandler(callback) {
    this._callback.editFormClose = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._closeEditClickHandler);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(this._data);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteClickHandler);
  }

  _startDateChangeHandler(selectedDates) {
    this.updateData({
      startDate: selectedDates[0]
    });

    if (moment(this._data.startDate).isAfter(this._data.endDate)) {
      this.updateData({
        endDate: this._data.startDate
      });
    }
  }

  _endDateChangeHandler(selectedDates) {
    this.updateData({
      endDate: selectedDates[0],
    });
  }


  setDatepickers() {
    this.destroyPicker(this._startDatepicker);
    this.destroyPicker(this._endDatepicker);

    this._startDatepicker = flatpickr(this.getElement()
      .querySelector(`#event-start-time-1`),
      {
        enableTime: true,
        dateFormat: `d / m / Y H: i`,
        defaultDate: this._data.startDate,
        onChange: this._startDateChangeHandler
      }
    );

    this._endDatepicker = flatpickr(this.getElement()
      .querySelector(`#event-end-time-1`),
      {
        enableTime: true,
        dateFormat: `d / m / Y H: i`,
        defaultDate: this._data.endDate,
        minDate: this._data.startDate,
        onChange: this._endDateChangeHandler
      }
    );
  }

  destroyPicker(datepicker) {
    if (datepicker) {
      datepicker.destroy();
      datepicker = null;
    }
  }

  _priceChangeHandler(evt) {
    this.updateData({price: Number(evt.target.value)});
  }

  _setPriceChangeHandler() {
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._priceChangeHandler);
  }

  restoreHandlers() {

    if (this.getElement().querySelector(`.event__rollup-btn`)) {
      this.setCloseEditClickHandler(this._callback.editFormClose);
    }
    this.setDeleteClickHandler(this._callback.deleteClick);
    this._setFavoriteClickHandler();
    this._setTypeChangeHandler();
    this._setDestinationChangeHandler();
    this._setPriceChangeHandler();
    this._setOffersChangeHandler();
    this.setDatepickers();
    this.setSubmitHandler(this._callback.submit);
  }

  reset(point) {
    this.updateData(Object.assign(point, {isFavorite: this._data.isFavorite}));
  }

  removeElement() {
    super.removeElement();
    this.destroyPicker(this._startDatepicker);
    this.destroyPicker(this._endDatepicker);
  }
}
