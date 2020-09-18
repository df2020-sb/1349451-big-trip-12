import moment from 'moment';


export const isDatesEqual = (dateA, dateB) => {
  return moment(dateA).isSame(dateB);
};

