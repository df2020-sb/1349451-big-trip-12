import {getRandomInteger, getRandomArrayElement, getRandomUniqueArrayElements} from '../utils/common';
import {POINT_TYPES, CITIES, MOCK_DESCRIPTION, OFFERS} from '../const.js';


export const createDescription = () => {
  const phraseArray = MOCK_DESCRIPTION.split(`.`);
  return (new Array(getRandomInteger(1, 5)).fill().map(() => getRandomArrayElement(phraseArray))).join(`. `);
};

export const getTypesByCategory = (category) => {
  return POINT_TYPES.filter((item) => item.category === category).map((item) => item.type);
};

export const getAvailableOffers = (type) => {
  let result = {};
  let offerCategories = POINT_TYPES.find((item) => item.type === type).offerCategories;
  if (offerCategories.length) {
    result = Object.assign({}, ...offerCategories.map((key) => ({[key]: OFFERS[key]})));
  }
  return result;
};

const createStartDate = () => {
  const maxDayRange = 4;
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
  const endDate = new Date(getRandomInteger(min, max));
  return new Date(endDate);
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const createPoint = () => {
  const type = getRandomArrayElement(POINT_TYPES).type;
  const startDate = createStartDate();
  const endDate = createEndDate(startDate);
  const duration = endDate - startDate;
  const availableOffers = getAvailableOffers(type);
  const randomOffersArray = getRandomUniqueArrayElements(Object.entries(availableOffers));

  return {
    id: generateId(),
    type,
    city: getRandomArrayElement(CITIES),
    price: getRandomInteger(10, 1000),
    startDate,
    endDate,
    duration,
    offers: Object.fromEntries(randomOffersArray),
    isFavorite: (!!getRandomInteger(0, 1)),
    destination: {
      description: createDescription(),
      photos: new Array(getRandomInteger(1, 5)).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`)
    },
  };
};
