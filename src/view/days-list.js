import {formatDateMonthDay, formatDateWithDashes} from '../utils.js';

export const createDaysListTemplate = (events) => {

  const tripStartDate = events[0].startDate;
  const tripEndDate = events[events.length - 1].endDate;
  const daysCount = Math.ceil((tripEndDate.getTime() - tripStartDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysArray = new Array(daysCount).fill();

  const addDays = (date, days) => {
    return new Date(date.setDate(date.getDate() + days));
  };

  return (
    `<ul class="trip-days">
    ${daysArray.map((_, index) => {
      let date = new Date(tripStartDate);
      date = addDays(date, index);
      return (`<li class="trip-days__item  day" id="_${formatDateWithDashes(date)}">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${formatDateWithDashes(date)}">${formatDateMonthDay(date)}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`);
    }).join(``)}
    </ul>`
  );
};
