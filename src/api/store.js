export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }


  getData() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }


  setPoints(points) {
    const store = this.getData();
    this._storage.setItem(this._storeKey, JSON.stringify(Object.assign({}, store, {
      points
    })));
  }


  setDestinations(destinations) {
    const store = this.getData();
    this._storage.setItem(this._storeKey, JSON.stringify(Object.assign({}, store, {
      destinations
    })));
  }


  setOffers(offers) {
    const store = this.getData();
    this._storage.setItem(this._storeKey, JSON.stringify(Object.assign({}, store, {
      offers
    })));
  }


  setPoint(key, value) {
    const store = this.getData();
    const storePoints = store.points;
    this._storage.setItem(this._storeKey, JSON.stringify(Object.assign({}, store,
        {
          points: Object.assign(storePoints, {[key]: value})
        }
    )));
  }


  removePoint(key) {
    const store = this.getData();
    delete store.points[key];
    this._storage.setItem(this._storeKey, JSON.stringify(store)
    );
  }
}
