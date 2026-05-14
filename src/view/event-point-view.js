import { humanizeEventDueDate } from '../utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import he from 'he';

function offersTemplate(offers){
  const {offersForType} = offers;

  return offersForType.map((offer) => `
                  <li class="event__offer">
                    <span class="event__offer-title">${offer.offerTitle}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </li>`).join('');
}

function eventTemplate(event){
  const {dueDate, eventType, city, price, isFavourite, startTime, endTime, timeDifference, offers} = event;
  const humanizeDate = humanizeEventDueDate(dueDate);

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dueDate}">${humanizeDate}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${eventType} ${he.encode(city ? `${city}` : '')}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dueDate}T${startTime}">${startTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dueDate}T${endTime}">${endTime}</time>
                  </p>
                  <p class="event__duration">${timeDifference}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offersTemplate(offers)}
                </ul>
                <button class="event__favorite-btn ${isFavourite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export default class createEvent extends AbstractStatefulView{
  #event = null;
  #handleEditClick = null;

  constructor({event, onEditClick}){
    super();
    this.#event = event;

    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#onChangeFavourite);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  _restoreHandlers(){
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#onChangeFavourite);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template(){
    return eventTemplate(this.#event);
  }

  #onChangeFavourite = (evt) =>{
    evt.preventDefault();
    this.#event.isFavourite = !this.#event.isFavourite;
    this.updateElement({
      isFavourite: !this.#event.isFavourite
    });
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
