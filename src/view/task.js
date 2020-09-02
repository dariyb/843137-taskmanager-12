import AbstractView from "./abstract.js";
import {isTaskExpired, isTaskRepeating, formatTaskDueDate} from "../utils/task.js";

const createSiteTaskTemplate = (task) => {
  const {color, description, dueDate, repeating, isFavorite, isArchive} = task;

  const date = formatTaskDueDate(dueDate);

  const deadlineClassName = isTaskExpired(dueDate)
    ? `card--deadline`
    : ``;

  const repeatingClassName = isTaskRepeating(repeating)
    ? `card--repeat`
    : ``;

  const favoriteClassName = isFavorite
    ? `card__btn--favorites card__btn--disabled`
    : `card__btn--favorites`;

  const archiveClassName = isArchive
    ? `card__btn--archive card__btn--disabled`
    : `card__btn--archive`;

  return `<article class="card card--${color} ${deadlineClassName} ${repeatingClassName}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn ${archiveClassName}">
              archive
            </button>
            <button
              type="button"
              class="card__btn ${favoriteClassName}"
            >
              favorites
            </button>
          </div>
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`;
};

export default class Task extends AbstractView {
  constructor(task) {
    super();
    this._task = task;

    this._onEditButton = this._onEditButton.bind(this);
    this._onFavoriteButton = this._onFavoriteButton.bind(this);
    this._onArchiveButton = this._onArchiveButton.bind(this);
  }
  getTemplate() {
    return createSiteTaskTemplate(this._task);
  }
  _onEditButton(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }
  _onFavoriteButton(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
  _onArchiveButton(evt) {
    evt.preventDefault();
    this._callback.archiveClick();
  }
  onEditButtonClick(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditButton);
  }
  onFavoriteButtonClick(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, this._onFavoriteButton);
  }
  onArchiveButtonClick(callback) {
    this._callback.archiveClick = callback;
    this.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, this._onArchiveButton);
  }
}
