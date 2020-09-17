import AbstractView from './abstract';
import {MenuItem} from '../const';


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

  constructor() {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._activeTabElement = this.getElement().querySelector(`[data-value=${MenuItem.TABLE}]`);
  }

  _getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName === `A` && evt.target !== this._activeTabElement) {
      this._activeTabElement.classList.remove(`trip-tabs__btn--active`);
      this._activeTabElement = evt.target;
      this._activeTabElement.classList.add(`trip-tabs__btn--active`);
      this._callback.menuClick(evt.target.dataset.value);
    }
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  resetMenu() {
    this._activeTabElement.classList.remove(`trip-tabs__btn--active`);
    this._activeTabElement = this.getElement().querySelector(`[data-value=${MenuItem.TABLE}]`);
    this._activeTabElement.classList.add(`trip-tabs__btn--active`);
    this._callback.menuClick(MenuItem.TABLE);
  }
}
