/* eslint-disable indent */
import Point from '../view/point';
import PointEdit from '../view/point-edit';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {isDatesEqual} from '../utils/common';
import {UserAction, UpdateType} from "../const";
import OffersModel from '../model/offers';
import {renderOffers} from '../view/point-edit';

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class PointPresenter {
  constructor(container, changeData, changeMode) {
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._container = container;
    this._pointComponent = null;
    this._pointEditComponent = null;
    this._availableOffers = {};
    this._mode = Mode.DEFAULT;

    this._offersModel = new OffersModel();

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleEditControlClick = this._handleEditControlClick.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCloseEditClick = this._handleCloseEditClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);

    this._handleAction = this._handleAction.bind(this);
    this._handleModelUpdate = this._handleModelUpdate.bind(this);

    this._offersModel.addObserver(this._handleModelUpdate);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._offersModel.setOffers(this._point.type);
    this._availableOffers = this._offersModel.getOffers();
    renderOffers(this._availableOffers);

    this._pointComponent = new Point(point);
    this._pointEditComponent = new PointEdit(point, this._handleAction, false);

    this._pointComponent.setEditControlClickHandler(this._handleEditControlClick);
    this._pointEditComponent.setSubmitHandler(this._handleSubmit);

    if (this._pointEditComponent.getElement().querySelector(`.event__rollup-btn`)) {
      this._pointEditComponent.setCloseEditClickHandler(this._handleCloseEditClick);
    }

    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    } else {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }


  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
    this._pointEditComponent.setDatepickers();
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._pointEditComponent.reset(this._point);
      this._replaceFormToPoint();
    }
  }

  _handleEditControlClick() {
    this._replacePointToForm();
  }

  _handleCloseEditClick() {
    this._pointEditComponent.reset(this._point);
    this._replaceFormToPoint();
  }

  _handleDeleteClick(point) {
    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.TRIP,
      point
    );
  }

  _handleSubmit(update) {
    const isTripUpdate =
      !isDatesEqual(this._point.startDate, update.startDate)
      || !isDatesEqual(this._point.endDate, update.endDate)
      || this._point.price !== update.price;

    this._changeData(UserAction.UPDATE_POINT,
      isTripUpdate ? UpdateType.TRIP : UpdateType.POINT,
      update);

    this._replaceFormToPoint();
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
    this.OffersModel.removeObserver(this._handleOffersModelUpdate);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
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
