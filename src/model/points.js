import Observer from '../utils/observer';


export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }


  setPoints(updateType, points) {
    this._points = [...points];
    this._notify(updateType);
  }


  getPoints() {
    return this._points;
  }


  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }


  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }


  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }


  static adaptToClient(point) {
    const adaptedPoint = Object.assign({}, point,
        {
          price: point.base_price,
          startDate: point.date_from ? new Date(point.date_from) : point.date_from,
          endDate: point.date_to ? new Date(point.date_to) : point.date_to,
          isFavorite: point.is_favorite,
        }
    );

    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.base_price;

    return adaptedPoint;
  }


  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          "base_price": point.price,
          "date_from": point.startDate instanceof Date ? point.startDate.toISOString() : null,
          "date_to": point.endDate instanceof Date ? point.endDate.toISOString() : null,
          "is_favorite": point.isFavorite,
        }
    );

    delete adaptedPoint.price;
    delete adaptedPoint.startDate;
    delete adaptedPoint.endDate;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}

