
export const POINT_TYPES = [
  {type: `Taxi`, category: `transfers`, offerCategories: [`luggage`, `comfort`]},
  {type: `Bus`, category: `transfers`, offerCategories: [`luggage`, `comfort`, `meal`, `seats`]},
  {type: `Train`, category: `transfers`, offerCategories: [`luggage`, `comfort`, `train`]},
  {type: `Ship`, category: `transfers`, offerCategories: [`luggage`, `comfort`, `seats`]},
  {type: `Transport`, category: `transfers`, offerCategories: [`luggage`, `seats`, `train`]},
  {type: `Drive`, category: `transfers`, offerCategories: []},
  {type: `Flight`, category: `transfers`, offerCategories: [`meal`, `comfort`]},
  {type: `Check-in`, category: `activities`, offerCategories: [`meal`, `comfort`]},
  {type: `Sightseeing`, category: `activities`, offerCategories: [`meal`, `comfort`, `seats`]},
  {type: `Restaurant`, category: `activities`, offerCategories: []},
];


export const CITIES = [`Rome`, `Paris`, `London`, `Madrid`, `Lisbon`, `Prague`, `Helsinki`];

export const MOCK_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export const OFFERS = {
  luggage: {title: `Add luggage`, price: 30},
  comfort: {title: `Switch to comfort class`, price: 100},
  meal: {title: `Add meal`, price: 15},
  seats: {title: `Choose seats`, price: 5},
  train: {title: `Travel by train`, price: 40},
};


export const filters = [`everything`, `future`, `past`];

export const SortType = {
  DEFAULT: `default`,
  TIME: `time`,
  PRICE: `price`
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const UpdateType = {
  POINT: `POINT`,
  TRIP: `TRIP`,
  ALL: `ALL`
};
