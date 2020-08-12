import {formatDateMonthDay, formatDateWithDashes} from '../utils.js';
import {createPointTemplate} from './point';

const createDay = () => {
  return {
    date: null,
    points: []
  };
};

const createDayTemplate = (date, dayPoints, index) => {
  return (`<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${index + 1}</span>
    <time class="day__date" datetime="${formatDateWithDashes(date)}">${formatDateMonthDay(date)}</time>
  </div>
  <ul class="trip-events__list">
  ${dayPoints.map((point) => createPointTemplate(point)).join(``)}
  </ul >
</li > `);
};

export const createDaysArray = (points) => {
  const daysArray = [];
  let newDay = createDay();

  for (let i = 1; i < points.length; i++) {
    if (points[i - 1].startDate.getDate() !== points[i].startDate.getDate()) {
      newDay.date = points[i - 1].startDate;
      daysArray.push(newDay);
      newDay = createDay();
    }
    newDay.points.push(points[i]);
  }

  return daysArray;
};

export const createDaysListTemplate = (daysArray) => {
  return (
    `<ul class="trip-days">
    ${daysArray.map((day, index) => {
      return createDayTemplate(day.date, day.points, index);
    }).join(``)}
    </ul > `
  );
};
