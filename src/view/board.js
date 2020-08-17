import AbstractView from "./abstract.js";

const createSiteBoardTemplate = () => {
  return (
    `<section class="board container"></section>`
  );
};

export default class Board extends AbstractView {
  getTemplate() {
    return createSiteBoardTemplate();
  }
}
