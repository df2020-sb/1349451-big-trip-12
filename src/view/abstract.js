import {createElement} from '../utils/render';


const SHAKE_ANIMATION_TIMEOUT = 600;


export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }
    this._element = null;
    this._callback = {};
  }


  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }
    return this._element;
  }


  removeElement() {
    this._element = null;
  }


  shake(callback) {
    this.getElement().classList.add(`shake`);
    setTimeout(() => {
      this.getElement().classList.remove(`shake`);
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }


  _getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }
}
