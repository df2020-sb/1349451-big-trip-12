import Observer from '../utils/observer';

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = [];
    this._currentOffer = {};
  }

  setOffers(offers) {
    this._offers = offers;
  }

  setCurrentOffer(type) {
    this._currentOffer = this._offers.find((offer) => offer.type === type);
    this._notify();
  }

  getOffer() {
    return this._currentOffer;
  }
}
