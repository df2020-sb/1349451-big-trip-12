import {formatDateMonthDay, formatDateWithDashes, createDay, countDays, addDays} from '../utils.js';
import {createPointTemplate} from './point';

export const createDaysListTemplate = (points) => {

  const tripStartDate = new Date(points[0].startDate.setHours(0, 0, 0, 1));
  const tripEndDate = points[points.length - 1].endDate;
  const daysCount = countDays(tripStartDate, tripEndDate);
  const daysArray = new Array(daysCount).fill().map(createDay);

  for (let i = 1; i < points.length; i++) {
    let dayNumber = countDays(tripStartDate, points[i].startDate);
    daysArray[dayNumber - 1].points.push(points[i]);
  }

  const createDayTemplate = (dayPoints, index) => {
    let date = new Date(tripStartDate);
    date = addDays(date, index);
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

  return (
    `<ul class="trip-days">
    ${daysArray.map((day, index) => {
      return createDayTemplate(day.points, index);
    }).join(``)}
    </ul > `
  );
};
