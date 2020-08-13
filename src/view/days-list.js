import {createElement} from "../utils.js";

const createDaysListTemplate = () => {
  return (
    `<ul class="trip-days"></ul > `
  );
};

export default class DaysList {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createDaysListTemplate();
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
