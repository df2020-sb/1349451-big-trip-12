/* eslint-disable indent */
import {POINT_TYPES} from '../const';
import PointEdit from '../view/point-edit';
import {generateId} from '../mock/point';
import {render, RenderPosition, remove} from '../utils/render';
import {UserAction, UpdateType} from "../const";
import OffersModel from '../model/offers';
import {renderOffers} from '../view/point-edit';

const addButton = document.querySelector(`.trip-main__event-add-btn`);

const EMPTY_POINT = {
  type: POINT_TYPES[0].type,
  city: ``,
  price: ``,
  startDate: null,
  endDate: null,
  offers: [],
  destination: {},
  isFavorite: false
};


export default class PointNew {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;

    this._offersModel = new OffersModel();
    this._availableOffers = {};

    this._pointEditComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleAction = this._handleAction.bind(this);
    this._handleModelUpdate = this._handleModelUpdate.bind(this);

    this._offersModel.addObserver(this._handleModelUpdate);
  }

  init() {

    if (this._pointEditComponent !== null) {
      return;
    }
    addButton.disabled = true;
    this._availableOffers = this._offersModel.getOffers();
    this._pointEditComponent = new PointEdit(EMPTY_POINT, this._handleAction, true);
    this._pointEditComponent.setSubmitHandler(this._handleSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    render(this._container, this._pointEditComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._pointEditComponent.setDatepickers();
  }

  destroy() {
    if (!this._pointEditComponent) {
      return;
    }
    remove(this._pointEditComponent);
    this._pointEditComponent = null;
    this._container.parentElement.remove();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    addButton.disabled = false;
  }

  _handleSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.TRIP,
      Object.assign({id: generateId()}, point)
    );
    this.destroy();

    addButton.disabled = false;
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
  _handleAction(type) {
    this._offersModel.setOffers(type);
  }

  _handleModelUpdate() {
    this._availableOffers = this._offersModel.getOffers();
    renderOffers(this._availableOffers);
  }
}
