import {MONTH_NAMES} from './const.js';

export const getRandomInteger = (a, b) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

export const getRandomUniqueArrayElements = (array) => {
  let indices = [];
  const newArrayLength = getRandomInteger(1, array.length);
  while (indices.length < newArrayLength) {
    let randomIndex = getRandomInteger(0, array.length - 1);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return indices.sort((a, b) => a - b).map((index) => array[index]);
};

export const formatDateWithDashes = (date) => {
  return `${date.getFullYear()}-${(`0` + (date.getMonth() + 1)).slice(-2)}-${(`0` + date.getDate()).slice(-2)}`;
};

export const formatDateWithSlashes = (date) => {
  return `${(`0` + date.getDate()).slice(-2)}/${(`0` + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
};

export const formatDateMonthDay = (date) => {
  return `${MONTH_NAMES[date.getMonth()]} ${(`0` + date.getDate()).slice(-2)}`;
};

export const formatTime = (date) => {
  return `${(`0` + date.getHours()).slice(-2)}:${(`0` + date.getMinutes()).slice(-2)}`;
};

export const formatDuration = (duration) => {

  const durationDays = Math.floor(duration / (1000 * 60 * 60 * 24));
  const durationDaysString = durationDays > 0 ? `${(`0` + durationDays.toString()).slice(-2)}D` : ``;

  const durationHours = Math.floor(duration / (1000 * 60 * 60));
  const durationHoursString = durationHours > 0 ? `${(`0` + durationHours.toString()).slice(-2)}H` : ``;

  const durationMinutes = Math.floor(duration / (1000 * 60));
  const durationMinutesString = durationMinutes > 0 ? `${(`0` + durationMinutes.toString()).slice(-2)}M` : ``;

  return `${durationDaysString} ${durationHoursString} ${durationMinutesString}`;
};

export const render = (container, position, template) => {
  container.insertAdjacentHTML(position, template);
};
