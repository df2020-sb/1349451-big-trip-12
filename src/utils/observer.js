export default class Observer {
  constructor() {
    this._observers = [];
  }


  addObserver(observer) {
    this._observers.push(observer);
  }


  removeObserver(observer) {
    this._observers = this._observers.filter((existedObserver) => existedObserver !== observer);
  }


  _notify(event, payload) {
    if (event) {
      this._observers.forEach((observer) => observer(event, payload));
    } else {
      this._observers[this._observers.length - 1]();
    }
  }
}
