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

export const updateArrayItem = (array, update) => {
  const index = array.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return array;
  }

  return [...array.slice(0, index), update, ...array.slice(index + 1)
  ];
};

export const formatDuration = (duration) => {

  let deltaInSeconds = duration / 1000;

  const days = Math.floor(deltaInSeconds / 86400);
  const daysString = days > 0 ? `${(`0` + days.toString()).slice(-2)}D` : ``;
  deltaInSeconds -= days * 86400;

  let hours = Math.floor(deltaInSeconds / 3600);
  const hoursString = hours > 0 ? `${(`0` + hours.toString()).slice(-2)}H` : ``;
  deltaInSeconds -= hours * 3600;

  let minutes = Math.floor(deltaInSeconds / 60);
  const minutesString = minutes > 0 ? `${(`0` + minutes.toString()).slice(-2)}M` : ``;
  deltaInSeconds -= minutes * 60;

  return `${daysString} ${hoursString} ${minutesString}`;
};
