import Observable from '../framework/observable.js';
import { filtersTypes } from '../filters-const.js';

export default class FilterModel extends Observable {
  #filter = filtersTypes.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}
