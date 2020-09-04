import AbstractView from "./abstract.js";
import {SortType} from "../const.js";

const createSortTemplate = (currentSortType) => {
  return `<div class="board__filter-list">
  <a href="#" class="board__filter ${currentSortType === SortType.DEFAULT ? `board__filter--active` : ``}" data-sort-type="${SortType.DEFAULT}">SORT BY DEFAULT</a>
  <a href="#" class="board__filter ${currentSortType === SortType.DATE_UP ? `board__filter--active` : ``}" data-sort-type="${SortType.DATE_UP}">SORT BY DATE up</a>
  <a href="#" class="board__filter ${currentSortType === SortType.DATE_DOWN ? `board__filter--active` : ``}" data-sort-type="${SortType.DATE_DOWN}">SORT BY DATE down</a>
</div>`;
};

export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeClick = this._sortTypeChangeClick.bind(this);
  }
  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }
  _sortTypeChangeClick(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
  onSortTypeClick(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeClick);
  }
}
