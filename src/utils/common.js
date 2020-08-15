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
  const newArrayLength = getRandomInteger(1, array.length);
  while (result.length < newArrayLength) {
    let index = getRandomInteger(0, array.length - 1);
    let randomElement = array[index];
    if (!result.includes(randomElement)) {
      result.push(randomElement);
    }
  }
  return result;
};
