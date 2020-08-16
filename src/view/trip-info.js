import {formatDateMonthDay} from '../utils/date';
import AbstractView from './abstract';

const createTripInfoTemplate = (points) => {

  const tripStartDate = points[0].startDate;
  const tripEndDate = points[points.length - 1].endDate;
  const tripStartDateString = formatDateMonthDay(tripStartDate);
  const tripEndDateString = tripStartDate.getMonth() !== tripEndDate.getMonth()
    ? formatDateMonthDay(tripEndDate)
    : `${(`0` + tripEndDate.getDate()).slice(-2)}`;

  const totalPrice = points.reduce((pointsTotal, point) =>
    pointsTotal + point.price + point.offers.reduce((offersTotal, offer) =>
      offersTotal + offer.price, 0
    ), 0);

  const cities = points.map((point) => point.city);
  const lastCity = cities.pop();

  const getMiddleCities = () => {
    let middleCities = `&mdash;`;
    const uniqueCities = Array.from(new Set(cities));
    uniqueCities.push(lastCity);

    if (lastCity === uniqueCities[uniqueCities.length - 2]) {
      uniqueCities.splice(-2, 1);
    }

    if (uniqueCities.length > 3) {
      middleCities = `&mdash; ... &mdash;`;
    } else if (uniqueCities.length === 3) {
      middleCities = `&mdash; ${uniqueCities[1]} &mdash;`;
    }

    return middleCities;
  };


  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${cities[0]}  ${getMiddleCities()} ${lastCity}</h1>
        <p class="trip-info__dates">${tripStartDateString}&nbsp;&mdash;&nbsp;${tripEndDateString}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
};

export default class TripInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  _getTemplate() {
    return createTripInfoTemplate(this._points);
  }
}
