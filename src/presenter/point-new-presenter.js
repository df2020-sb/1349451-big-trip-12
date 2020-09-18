import {POINT_TYPES} from '../const';
import PointEdit from '../view/point-edit';
import {render, RenderPosition, remove} from '../utils/render';
import {UserAction, UpdateType} from '../const';
import {renderOffer} from '../view/point-edit';
import {renderDestination} from '../view/point-edit';

const addButton = document.querySelector(`.trip-main__event-add-btn`);

const EMPTY_POINT = {
  price: ``,
  startDate: null,
  endDate: null,
  destination: {},
  isFavorite: false,
  offers: [],
  type: Object.values(POINT_TYPES)[0][0]
};

export default class PointNew {
  constructor(container, destinationsModel, offersModel, changeData) {
    this._container = container;
    this._changeData = changeData;

    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    this._currentOffer = {};
    this._currentDestination = {};

    this._pointEditComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleOffersChange = this._handleOffersChange.bind(this);
    this._handleOffersModelUpdate = this._handleOffersModelUpdate.bind(this);
    this._handleDestinationChange = this._handleDestinationChange.bind(this);
    this._handleDestinationsModelUpdate = this._handleDestinationsModelUpdate.bind(this);

    this._offersModel.addObserver(this._handleOffersModelUpdate);
    this._destinationsModel.addObserver(this._handleDestinationsModelUpdate);
  }


  init() {
    if (this._pointEditComponent) {
      return;
    }
    addButton.disabled = true;

    const allCities = this._destinationsModel._getAllCities() || [];
    this._pointEditComponent = new PointEdit(EMPTY_POINT, allCities, this._handleOffersChange, this._handleDestinationChange, true);
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
    this._offersModel.removeObserver(this._handleOffersModelUpdate);
    this._destinationsModel.removeObserver(this._handleDestinationsModelUpdate);
    remove(this._pointEditComponent);
    this._pointEditComponent = null;
    this._container.parentElement.remove();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    addButton.disabled = false;
  }


  setToSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }


  setToError() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };
    this._pointEditComponent.shake(resetFormState);
  }


  _handleSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.TRIP,
        point);
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


  _handleOffersChange(type) {
    this._offersModel.setCurrentOffer(type);
  }


  _handleOffersModelUpdate() {
    this._currentOffer = this._offersModel.getOffer();
    renderOffer(this._currentOffer);
  }


  _handleDestinationChange(city) {
    this._destinationsModel.setCurrentDestination(city);
  }


  _handleDestinationsModelUpdate() {
    this._currentDestination = this._destinationsModel.getCurrentDestination();
    renderDestination(this._currentDestination);
  }
}
