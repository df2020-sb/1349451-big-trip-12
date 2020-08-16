import {MONTH_NAMES} from '../const';

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
