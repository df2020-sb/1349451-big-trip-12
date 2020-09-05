import AbstractView from './abstract';
import {MenuItem} from "../const.js";

const createMenuTemplate = () => {
  return (
    `<div>
      <h2 class="visually-hidden">Switch trip view</h2>
      <nav class="trip-controls__trip-tabs  trip-tabs">
       <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-value="${MenuItem.TABLE}">Table</a>
       <a class="trip-tabs__btn" href="#" data-value="${MenuItem.STATS}">Stats</a>
      </nav>
    </div>`
  );
};

export default class Menu extends AbstractView {

  constructor(activeTab) {
    super();
    this._activeTab = activeTab;
    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._tabs = this.getElement().querySelectorAll(`.trip-tabs__btn`);
  }

  _getTemplate() {
    return createMenuTemplate(this._activeTab);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName === `A` && !evt.target.classList.contains(`trip-tabs__btn--active`)) {
      this._tabs.forEach((element) => element.classList.remove(`trip-tabs__btn--active`));
      evt.target.classList.add(`trip-tabs__btn--active`);
      this._callback.menuClick(evt.target.dataset.value);
    }
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  resetMenu() {
    this._tabs.forEach((element) => element.classList.remove(`trip-tabs__btn--active`));
    this.getElement().querySelector(`[data-value=${MenuItem.TABLE}]`).classList.add(`trip-tabs__btn--active`);
    this._callback.menuClick(MenuItem.TABLE);
  }
}
