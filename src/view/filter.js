import AbstractView from './abstract';


const createFilter = (filter, currentFilterType) => {
  const {type, isUsed} = filter;
  return (
    `<div class="trip-filters__filter">
        <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? `checked` : ``} ${isUsed ? `` : `disabled`}>
        <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
      </div>`
  );
};


const createFiltersTemplate = (filters, currentFilterType) => {
  const filtersTemplate = filters
    .map((filter) => createFilter(filter, currentFilterType)).join(``);
  return (
    `<div>
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${filtersTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>`
  );
};


export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
  }


  setTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelector(`form`).addEventListener(`click`, this._typeChangeHandler);
  }


  _getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilter);
  }


  _typeChangeHandler(evt) {
    if (evt.target.tagName === `INPUT`) {
      this._callback.filterTypeChange(evt.target.value);
    }
  }
}
