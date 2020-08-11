import {formatDateMonthDay, formatDateWithDashes, countDays, addDays} from '../utils.js';
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
  const tripStartDate = new Date(points[0].startDate.setHours(0, 0, 0, 1));
  const tripEndDate = points[points.length - 1].endDate;
  const daysCount = countDays(tripStartDate, tripEndDate);

  for (let i = 0; i < daysCount; i++) {
    daysArray.push(createDay());
    daysArray[i].date = addDays(tripStartDate, i);

    const filteredPoints = points.filter((point) => countDays(point.startDate, daysArray[i].date) === 0);
    daysArray[i].points.push(...filteredPoints);
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
