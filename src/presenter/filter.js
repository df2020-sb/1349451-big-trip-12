import FilterView from '../view/filter';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {filter} from '../utils/filter';
import {FilterType, UpdateType} from '../const';


export default class FilterPresenter {
  constructor(filterContainer, filterModel, pointsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;
    this._currentFilter = null;
    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setTypeChangeHandler(this._handleFilterTypeChange);

    if (!prevFilterComponent) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }


  _getFilters() {
    const points = this._pointsModel.getPoints();

    return [
      {
        type: FilterType.EVERYTHING,
        isUsed: filter[FilterType.EVERYTHING](points).length
      },
      {
        type: FilterType.FUTURE,
        isUsed: filter[FilterType.FUTURE](points).length
      },
      {
        type: FilterType.PAST,
        isUsed: filter[FilterType.PAST](points).length
      },
    ];
  }


  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateType.ALL, filterType);
  }


  _handleModelEvent() {
    this.init();
  }
}
