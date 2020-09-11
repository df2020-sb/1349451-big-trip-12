import moment from "moment";


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
  let result = [];
  const newArrayLength = array.length ? getRandomInteger(1, array.length) : 0;
  while (result.length < newArrayLength) {
    let index = getRandomInteger(0, array.length - 1);
    let randomElement = array[index];
    if (!result.includes(randomElement)) {
      result.push(randomElement);
    }
  }
  return result;
};


export const isDatesEqual = (dateA, dateB) => {
  return moment(dateA).isSame(dateB);
};

export const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.substring(1);
};
