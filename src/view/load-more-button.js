import AbstractView from "./abstract.js";

const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadMoreButton extends AbstractView {
  constructor() {
    super();
    this._onClickTap = this._onClickTap.bind(this);
  }
  getTemplate() {
    return createLoadMoreButtonTemplate();
  }
  _onClickTap(evt) {
    evt.preventDefault();
    this._callback.click();
  }
  onClick(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._onClickTap);
  }
}
