import Observer from '../utils/observer';
import {UpdateType} from '../const';


export default class Destinations extends Observer {
  constructor() {
    super();
    this._destinations = [];
    this._currentDestination = {};
  }

  setDestinations(destinations) {
    this._destinations = destinations;
    this._notify(UpdateType.TRIP);
  }

  _getAllCities() {
    return this._destinations.map((destination) => destination.name);
  }


  setCurrentDestination(city) {
    this._currentDestination = this._destinations.find((destination) => destination.name === city);
    this._notify();
  }

  getCurrentDestination() {
    return this._currentDestination;
  }

  getAllDestinations() {
    return this._destinations;
  }
}
