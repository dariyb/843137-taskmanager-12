const isExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  let currentDay = new Date();
  currentDay.setHours(23, 59, 59, 999);
  currentDay = new Date(currentDay);

  return currentDay.getTime() > dueDate.getTime();
};

const isRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};

export const createSiteTaskTemplate = (task) => {
  const {color, description, dueDate, repeating, isFavorite, isArchive} = task;

  const date = dueDate !== null
    ? dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`})
    : ``;

  const deadlineClassName = isExpired(dueDate)
    ? `card--deadline`
    : ``;

  const repeatingClassName = isRepeating(repeating)
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
