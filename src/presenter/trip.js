import {render, RenderPosition, replace} from '../utils/render';
import Sort from '../view/sort';
import Day from '../view/day';
import DaysList from '../view/days-list';
import Point from '../view/point';
import PointEdit from '../view/point-edit';
import NoPoints from '../view/no-points';


const createDay = () => {
  return {
    date: null,
    points: []
  };
};

const createDaysArray = (points) => {
  const daysArray = [];
  let newDay = createDay();
  let startDate = points[0].startDate.getDate();

  for (let point of points) {
    if (point.startDate.getDate() !== startDate) {
      newDay.date = point.startDate;
      daysArray.push(newDay);
      newDay = createDay();
      startDate = point.startDate.getDate();
    }
    newDay.points.push(point);
  }
  return daysArray;
};


export default class Trip {

  constructor(container, points) {
    this._points = [...points];
    this._container = container;
    this._sortComponent = new Sort();
    this._daysListComponent = new DaysList();
    this._noPointsComponent = new NoPoints();
  }

  _renderPoint(pointsContainer, point) {
    const pointComponent = new Point(point);
    const pointEditComponent = new PointEdit(point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    pointComponent.setRollupClickHandler(() => {
      replacePointToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    pointEditComponent.setSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(pointsContainer, pointComponent, RenderPosition.BEFOREEND);
  }

  init() {
    const daysArray = createDaysArray(this._points);
    let dayNumber = 0;
    render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);

    if (!this._points[0]) {
      render(this._container, this._noPointsComponent, RenderPosition.AFTERBEGIN);
      return;
    }
    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);

    daysArray.forEach((day) => {
      const dayComponent = new Day(day.date, ++dayNumber);
      render(this._daysListComponent, dayComponent, RenderPosition.BEFOREEND);
      const pointsContainer = dayComponent.getElement().querySelector(`.trip-events__list`);
      day.points.forEach((point) => this._renderPoint(pointsContainer, point));
    });
  }
}
