import {formatDateMonthDay, formatDateWithDashes, createElement} from '../utils.js';

const createDayTemplate = (date, index) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${formatDateWithDashes(date)}">${formatDateMonthDay(date)}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`);
};

export default class Day {
  constructor(date, index) {
    this._date = date;
    this._index = index;
    this._element = null;
  }

  _getTemplate() {
    return createDayTemplate(this._date, this._index);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}

