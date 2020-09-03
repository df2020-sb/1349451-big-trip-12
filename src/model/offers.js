import Observer from "../utils/observer";
import {POINT_TYPES, OFFERS} from '../const';

const getAvailableOffers = (type) => {
  const offersArray = POINT_TYPES.find((item) => item.type === type).offerCategories;
  return Object.fromEntries(Object.entries(OFFERS).filter(([key, _]) => offersArray.includes(key)));
};

export default class Offers extends Observer {
  constructor() {
    super();
    this._availableOffers = getAvailableOffers(POINT_TYPES[0].type);
  }

  setOffers(pointType) {
    this._availableOffers = getAvailableOffers(pointType);
    this._notify();
  }

  getOffers() {
    return this._availableOffers;
  }
}
