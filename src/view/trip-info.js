import AbstractView from './abstract';
import moment from 'moment';


const createTripInfoTemplate = (points) => {
  const tripStartDate = points.length ? points[0].startDate : null;
  const tripEndDate = points.length ? points[points.length - 1].endDate : null;
  let tripStartDateString = tripStartDate ? moment(tripStartDate).format(`MMM DD`) : ``;
  let tripEndDateString = ``;
  if (tripStartDate && tripEndDate) {
    tripEndDateString = tripStartDate.getMonth() !== tripEndDate.getMonth()
      ? moment(tripEndDate).format(`MMM DD`)
      : `${moment(tripEndDate).format(`DD`)}`;
  }


  const getOffersPrice = (point) => {
    let total = 0;
    if (point.offers.length) {
      total = point.offers.reduce((offersTotal, offer) =>
        offersTotal + offer.price, 0);
    }
    return total;
  };


  const totalPrice = points.reduce((pointsTotal, point) => pointsTotal + Number(point.price) + getOffersPrice(point), 0);
  const cities = points.map((point) => point.destination.name);
  const lastCity = cities.pop();


  const getMiddleCities = () => {
    let middleCities = points.length ? `&mdash;` : ``;
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
        <h1 class="trip-info__title">${cities[0] || ``}  ${getMiddleCities()} ${lastCity || ``}</h1>
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
