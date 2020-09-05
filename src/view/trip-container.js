import AbstractView from './abstract';

const createTripContainerTemplate = () => {
  return `<section class="trip-events">
<h2 class="visually-hidden">Trip events</h2>
</section`;
};

export default class TripContainer extends AbstractView {

  _getTemplate() {
    return createTripContainerTemplate();
  }
}
