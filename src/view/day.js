import {formatDateMonthDay, formatDateWithDashes} from '../utils/date';
import AbstractView from './abstract';

const createDayTemplate = (date, index) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index || ``}</span>
        <time class="day__date" datetime="${date ? formatDateWithDashes(date) : ``}">${date ? formatDateMonthDay(date) : ``}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`);
};

export default class Day extends AbstractView {
  constructor(date, index) {
    super();
    this._date = date;
    this._index = index;
  }

  _getTemplate() {
    return createDayTemplate(this._date, this._index);
  }
}
