import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFilterTemplate} from "./view/filter.js";
import {createSiteBoardTemplate} from "./view/board.js";
import {createSiteTaskTemplate} from "./view/task.js";
import {createTaskEditTemplate} from "./view/task-edit.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {generateTask} from "./mock/task.js";

const TASK_COUNT = 4;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSiteFilterTemplate(), `beforeend`);
render(siteMainElement, createSiteBoardTemplate(), `beforeend`);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const siteBoardContainer = siteMainElement.querySelector(`.board`);

render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

for (let i = 1; i < TASK_COUNT; i++) {
  render(taskListElement, createSiteTaskTemplate(tasks[i]), `beforeend`);
}

render(siteBoardContainer, createLoadMoreButtonTemplate(), `beforeend`);
