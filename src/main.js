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

const POINTS_COUNT = 20;

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

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replacePointToForm();
  });

  pointEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  render(pointsContainer, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const points = new Array(POINTS_COUNT)
  .fill()
  .map(createPoint)
  .sort((a, b) => a.startDate - b.startDate);

const daysArray = createDaysArray(points);

const main = document.querySelector(`.trip-main`);
const controls = document.querySelector(`.trip-controls`);
const tripContainer = document.querySelector(`.trip-events`);

render(main, new TripInfo(points).getElement(), RenderPosition.AFTERBEGIN);
render(controls, new Filter().getElement(), RenderPosition.AFTERBEGIN);
render(controls, new Menu().getElement(), RenderPosition.AFTERBEGIN);
render(tripContainer, new Sort().getElement(), RenderPosition.BEFOREEND);

const daysList = new DaysList();
render(tripContainer, daysList.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < daysArray.length; i++) {
  const day = new Day(daysArray[i].date, i);
  render(daysList.getElement(), day.getElement(), RenderPosition.BEFOREEND);
  const pointsContainer = day.getElement().querySelector(`.trip-events__list`);
  daysArray[i].points.forEach((point) => renderPoint(pointsContainer, point));
}
