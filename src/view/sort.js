import AbstractView from "./abstract.js";
import {SortType} from "../const.js";

const createSortTemplate = () => {
  return `<div class="board__filter-list">
  <a href="#" class="board__filter" data-sort-type="${SortType.DEFAULT}">SORT BY DEFAULT</a>
  <a href="#" class="board__filter" data-sort-type="${SortType.DATE_UP}">SORT BY DATE up</a>
  <a href="#" class="board__filter" data-sort-type="${SortType.DATE_DOWN}">SORT BY DATE down</a>
</div>`;
};

export default class Sort extends AbstractView {
  constructor() {
    super();
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }
  getTemplate() {
    return createSortTemplate();
  }
  _onSortTypeChange(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
  onSortTypeChangeClick(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._onSortTypeChange);
  }
}
