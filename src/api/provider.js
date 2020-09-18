import {nanoid} from 'nanoid';
import PointsModel from '../model/points';


const getSyncedPoints = (points) => {
  return points.filter(({success}) => success)
    .map(({payload}) => payload.point);
};


const createPointsStructureForStore = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {[current.id]: current});
  }, {});
};


export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }


  getPoints() {
    if (this._isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const receivedPoints = createPointsStructureForStore(points.map(PointsModel.adaptToServer));
          this._store.setPoints(receivedPoints);
          return points;
        });
    }
    const storePoints = Object.values((this._store.getData()).points);
    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
  }


  getDestinations() {
    if (this._isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._store.setDestinations(destinations);
          return destinations;
        });
    }
    const storeDestinations = this._store.getData().destinations;
    return Promise.resolve(storeDestinations);
  }


  getOffers() {
    if (this._isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          this._store.setOffers(offers);
          return offers;
        });
    }
    const storeOffers = this._store.getData().offers;
    return Promise.resolve(storeOffers);
  }


  updatePoint(point) {
    if (this._isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setPoint(updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setPoint(point.id, PointsModel.adaptToServer(Object.assign({}, point)));
    return Promise.resolve(point);
  }


  addPoint(point) {
    if (this._isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._store.setPoint(newPoint.id, PointsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }
    const localNewPointId = nanoid();
    const localNewPoint = Object.assign({}, point, {id: localNewPointId});
    this._store.setPoint(localNewPoint.id, PointsModel.adaptToServer(localNewPoint));
    return Promise.resolve(localNewPoint);
  }


  deletePoint(point) {
    if (this._isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removePoint(point.id));
    }
    this._store.removePoint(point.id);
    return Promise.resolve();
  }


  sync() {
    if (this._isOnline()) {
      const storePoints = Object.values((this._store.getData()).points);

      return this._api.sync(storePoints)
        .then((response) => {
          const allPoints = createPointsStructureForStore([...response.created, ...getSyncedPoints(response.updated)]);
          this._store.setPoints(allPoints);
        });
    }
    return Promise.reject(new Error(`Sync data failed`));
  }


  _isOnline() {
    return window.navigator.onLine;
  }
}
