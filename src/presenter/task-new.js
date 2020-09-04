import TaskEditView from "../view/task-edit.js";
import {generateId} from "../mock/task.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

const ESC_KEYCODE = 27;

export default class TaskNew {
  constructor(taskListContainer, changeData) {
    this._taskListContainer = taskListContainer;
    this._changeData = changeData;

    this._taskEditComponent = null;

    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
  }
  init() {
    if (this._taskEditComponent !== null) {
      return;
    }
    this._taskEditComponent = new TaskEditView();
    this._taskEditComponent.onFormSubmitClick(this._onFormSubmit);
    this._taskEditComponent.onDeleteClick(this._onDeleteClick);

    render(this._taskListContainer, this._taskEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._onEscPress);
  }
  destroy() {
    if (this._taskEditComponent === null) {
      return;
    }

    remove(this._taskEditComponent);
    this._taskEditComponent = null;

    document.removeEventListener(`keydown`, this._onEscPress);
  }
  _onFormSubmit(task) {
    this._changeData(
        UserAction.ADD_TASK,
        UpdateType.MINOR,
        Object.assign({id: generateId()}, task)
    );
    this.destroy();
  }
  _onDeleteClick() {
    this.destroy();
  }
  _onEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
