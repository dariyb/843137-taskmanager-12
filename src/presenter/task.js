import TaskView from "../view/task.js";
import TaskEditView from "../view/task-edit.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

const ESC_KEYCODE = 27;
const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Task {
  constructor(taskListContainer, changeData, changeMode) {
    this._taskListContainer = taskListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._taskComponent = null;
    this._taskEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._onEditCLick = this._onEditCLick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._onArchiveClick = this._onArchiveClick.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
  }
  init(task) {
    this._task = task;

    const prevTaskComponent = this._taskComponent;
    const prevTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskView(task);
    this._taskEditComponent = new TaskEditView(task);

    this._taskComponent.onEditButtonClick(this._onEditCLick);
    this._taskComponent.onFavoriteButtonClick(this._onFavoriteClick);
    this._taskComponent.onArchiveButtonClick(this._onArchiveClick);
    this._taskEditComponent.onFormSubmitClick(this._onFormSubmit);

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this._taskListContainer, this._taskComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._taskComponent, prevTaskComponent);
    }
    if (this._mode === Mode.EDITING) {
      replace(this._taskEditComponent, prevTaskEditComponent);
    }
    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }
  destroy() {
    remove(this._taskComponent);
    remove(this._taskEditComponent);
  }
  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }
  _replaceCardToForm() {
    replace(this._taskEditComponent, this._taskComponent);
    document.addEventListener(`keydown`, this._onEscPress);
    this._changeMode();
    this._mode = Mode.EDITING;
  }
  _replaceFormToCard() {
    replace(this._taskComponent, this._taskEditComponent);
    document.removeEventListener(`keydown`, this._onEscPress);
    this._mode = Mode.DEFAULT;
  }

  _onEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();

      this._taskEditComponent.reset(this._task);

      this._replaceFormToCard();
    }
  }
  _onEditCLick() {
    this._replaceCardToForm();
  }
  _onFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._task,
            {
              isFavorite: !this._task.isFavorite
            }
        )
    );
  }
  _onArchiveClick() {
    this._changeData(
        Object.assign(
            {},
            this._task,
            {
              isArchive: !this._task.isArchive
            }
        )
    );
  }
  _onFormSubmit(task) {
    this._changeData(task);
    this._replaceFormToCard();
  }
}
