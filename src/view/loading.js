import AbstractView from './abstract';

const createNoPointsTemplate = () => {
  return `<p class="trip-events__msg">Loading...</p>`;
};

export default class Loading extends AbstractView {
  _getTemplate() {
    return createNoPointsTemplate();
  }
}
