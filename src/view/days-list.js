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
  ${dayPoints.map(createPointTemplate).join(``)}
  </ul >
</li > `);
};

export const createDaysArray = (points) => {
  const tripStartDate = new Date(points[0].startDate.setHours(0, 0, 0, 1));
  const tripEndDate = points[points.length - 1].endDate;
  const daysCount = countDays(tripStartDate, tripEndDate);
  const daysArray = new Array(daysCount).fill().map(createDay);

  for (let i = 1; i < points.length; i++) {
    let dayNumber = countDays(tripStartDate, points[i].startDate);
    daysArray[dayNumber - 1].points.push(points[i]);
  }

  for (let i = 0; i < daysArray.length; i++) {
    let date = new Date(tripStartDate);
    daysArray[i].date = addDays(date, i);
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
