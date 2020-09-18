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


export default class MenuView extends AbstractView {

  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
    this._activeTab = this.getElement().querySelector(`[data-value=${MenuItem.TABLE}]`);
  }


  reset() {
    this._activeTab.classList.remove(`trip-tabs__btn--active`);
    this._activeTab = this.getElement().querySelector(`[data-value=${MenuItem.TABLE}]`);
    this._activeTab.classList.add(`trip-tabs__btn--active`);
    this._callback.menuClick(MenuItem.TABLE);
  }

  setClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }


  _getTemplate() {
    return createMenuTemplate();
  }


  _clickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName === `A` && evt.target !== this._activeTab) {
      this._activeTab.classList.remove(`trip-tabs__btn--active`);
      this._activeTab = evt.target;
      this._activeTab.classList.add(`trip-tabs__btn--active`);
      this._callback.menuClick(evt.target.dataset.value);
    }
  }
}
