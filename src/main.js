import TripPresenter from './presenter/presenter.js';
import createTripMainInfo from './view/trip-main-info-view.js';
import { render, RenderPosition } from './framework/render.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const tripEvents = document.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');
// const newEventButton = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel);
const filterPresenter = new FilterPresenter({filterContainer: tripControlsFilters, filterModel, pointsModel});

// function handleNewPointButtonClick(){
//   tripPresenter.createNewPoint();
//   newEventButton.element.disabled = true;
// }

render(new createTripMainInfo(), tripMain, RenderPosition.AFTERBEGIN);

filterPresenter.init();
tripPresenter.init();

