import {render, RenderPosition} from './utils.js';
import {createPoint} from './mock/point';
import TripInfo from './view/trip-info';
import Menu from './view/menu';
import Filter from './view/filters';
import Sort from './view/sort';
import Day from './view/day';
import DaysList from './view/days-list';
import Point from './view/point';
import PointEdit from './view/point-edit';
import NoPoints from './view/no-points';

const POINTS_COUNT = 30;

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


const renderPoint = (pointsContainer, point) => {
  const pointComponent = new Point(point);
  const pointEditComponent = new PointEdit(point);

  const replacePointToForm = () => {
    pointsContainer.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    pointsContainer.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replacePointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(pointsContainer, pointComponent.getElement(), RenderPosition.BEFOREEND);
};


const renderTripInfo = (container, points) => {
  if (!points[0]) {
    return;
  }
  render(container, new TripInfo(points).getElement(), RenderPosition.AFTERBEGIN);
};


const renderTrip = (container, daysArray) => {
  const daysList = new DaysList();
  render(container, daysList.getElement(), RenderPosition.BEFOREEND);

  if (!points[0]) {
    render(container, new NoPoints().getElement(), RenderPosition.AFTERBEGIN);
    return;
  }

  render(tripContainer, new Sort().getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < daysArray.length; i++) {
    const day = new Day(daysArray[i].date, i);
    render(daysList.getElement(), day.getElement(), RenderPosition.BEFOREEND);
    const pointsContainer = day.getElement().querySelector(`.trip-events__list`);
    daysArray[i].points.forEach((point) => renderPoint(pointsContainer, point));
  }
};


const points = new Array(POINTS_COUNT)
  .fill()
  .map(createPoint)
  .sort((a, b) => a.startDate - b.startDate);

const daysArray = createDaysArray(points);

const main = document.querySelector(`.trip-main`);
const controls = document.querySelector(`.trip-controls`);
const tripContainer = document.querySelector(`.trip-events`);

renderTripInfo(main, points);
render(controls, new Filter().getElement(), RenderPosition.AFTERBEGIN);
render(controls, new Menu().getElement(), RenderPosition.AFTERBEGIN);
renderTrip(tripContainer, daysArray);
