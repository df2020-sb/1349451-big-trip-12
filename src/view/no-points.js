import View from './View';

const createNoPointsTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class NoPoints extends View {
  _getTemplate() {
    return createNoPointsTemplate();
  }
}
