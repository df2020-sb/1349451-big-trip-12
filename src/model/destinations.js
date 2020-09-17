import Observer from '../utils/observer';


export default class Destinations extends Observer {
  constructor() {
    super();
    this._destinations = [];
    this._currentDestination = {};
  }


  setDestinations(destinations) {
    this._destinations = destinations;
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

  _getAllCities() {
    return this._destinations.map((destination) => destination.name);
  }
}
