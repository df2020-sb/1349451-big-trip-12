import {FILTER} from '../const';
import View from './View';

const createFiltersTemplate = () => {
  return (
    `<div>
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
      ${Object.entries(FILTER).map(([filterName, isActive]) =>
      `<div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterName.toLowerCase()}" ${isActive ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-everything">${filterName}</label>
      </div>`
    ).join(``)}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>`
  );
};

export default class Filter extends View {
  _getTemplate() {
    return createFiltersTemplate();
  }
}
