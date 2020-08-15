import View from './View';

const createDaysListTemplate = () => {
  return (
    `<ul class="trip-days"></ul > `
  );
};

export default class DaysList extends View {
  _getTemplate() {
    return createDaysListTemplate();
  }
}
