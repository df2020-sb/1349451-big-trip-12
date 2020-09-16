export const POINT_TYPES = {
  transfers: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`],
  activities: [`check-in`, `sightseeing`, `restaurant`]
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

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
