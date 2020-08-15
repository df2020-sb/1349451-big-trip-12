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

  for (let i = 0; i < points.length; i++) {
    if (i > 0 && points[i - 1].startDate.getDate() !== points[i].startDate.getDate()) {
      newDay.date = points[i - 1].startDate;
      daysArray.push(newDay);
      newDay = createDay();
    }
    newDay.points.push(points[i]);
  }
  return daysArray;
};


export default class Trip {

  constructor(container, points) {
    this._points = [...points];
    this._receivedPoints = [...points];

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
    render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);

    if (!this._points[0]) {
      render(this._container, this._noPointsComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);

    for (let i = 0; i < daysArray.length; i++) {
      const day = new Day(daysArray[i].date, i);
      render(this._daysListComponent, day, RenderPosition.BEFOREEND);
      const pointsContainer = day.getElement().querySelector(`.trip-events__list`);
      daysArray[i].points.forEach((point) => this._renderPoint(pointsContainer, point));
    }
  }
}
