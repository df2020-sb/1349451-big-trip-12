import moment from 'moment';

export const filter = {
  everything: (points) => points,
  future: (points) => points.filter((point) => moment(point.startDate).isAfter()),
  past: (points) => points.filter((point) => moment(point.startDate).isBefore()),
};
