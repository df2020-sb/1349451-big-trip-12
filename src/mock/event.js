import {getRandomInteger, getRandomArrayElement, getRandomUniqueArrayElements} from '../utils.js';
import {EVENT_TYPES, CITIES, MOCK_DESCRIPTION, OFFERS} from '../const.js';


const createDescription = () => {
  const phraseArray = MOCK_DESCRIPTION.split(`.`);
  return new Array(getRandomInteger(1, 5)).fill().map(() => getRandomArrayElement(phraseArray));
};

const createStartDate = () => {
  const maxDayRange = 3;
  const dayRange = getRandomInteger(-maxDayRange, maxDayRange);
  const currentDate = new Date();
  currentDate.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59));
  currentDate.setDate(currentDate.getDate() + dayRange);
  return new Date(currentDate);
};

const createEndDate = (date) => {
  const startDate = new Date(date);
  const min = new Date(startDate).getTime();
  const max = new Date(startDate.setHours(23, 59, 59, 999)).getTime();
  const endDate = new Date(getRandomInteger(min, max)); // пока для простоты события заканчиваются в тот же день, что и начинаются
  return new Date(endDate);
};

export const createEvent = () => {

  const {transfers, activities} = EVENT_TYPES;
  const startDate = createStartDate();
  const endDate = createEndDate(startDate);
  const duration = endDate - startDate;

  return {
    type: getRandomArrayElement([...transfers, ...activities]),
    city: getRandomArrayElement(CITIES),
    price: getRandomInteger(10, 1000),
    startDate,
    endDate,
    duration,
    offers: getRandomUniqueArrayElements(OFFERS),
    destination: {
      description: createDescription(),
      photos: new Array(getRandomInteger(1, 5)).fill()
    }
  };
};