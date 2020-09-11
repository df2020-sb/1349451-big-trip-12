
export const POINT_TYPES = {
  transfers: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`],
  activities: [`check-in`, `sightseeing`, `restaurant`]
};

// export const OFFERS = {
//   luggage: {title: `Add luggage`, price: 30},
//   comfort: {title: `Switch to comfort class`, price: 100},
//   meal: {title: `Add meal`, price: 15},
//   seats: {title: `Choose seats`, price: 5},
//   train: {title: `Travel by train`, price: 40},
// };

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
  ALL: `ALL`,
  INIT: `INIT`
};


export const MenuItem = {
  TABLE: `TABLE`,
  STATS: `STATS`
};

export const ICONS = new Map([
  [`bus`, `🚌`],
  [`check-in`, `🏨`],
  [`drive`, `🚗`],
  [`flight`, `✈️`],
  [`restaurant`, `🍴`],
  [`ship`, `🛳`],
  [`sightseeing`, `🏛`],
  [`taxi`, `🚕`],
  [`train`, `🚂`],
  [`transport`, `🚊`],
]);
