import {COLORS} from "../const.js";
import {getRandomNumber} from "../utils.js";


const generateDescription = () => {
  const descriptions = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ];

  const randomIndex = getRandomNumber(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateDate = () => {
  // ноль-ложь,один-истина
  const isDate = Boolean(getRandomNumber(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomNumber(-maxDaysGap, maxDaysGap);
  const currentDay = new Date();

  currentDay.setHours(23, 59, 59, 999);
  currentDay.setDate(currentDay.getDate() + daysGap);

  return new Date(currentDay);
};

const generateRepeating = () => {
  return {
    mo: false,
    tu: Boolean(getRandomNumber(0, 1)),
    we: false,
    th: Boolean(getRandomNumber(0, 1)),
    fr: false,
    sa: false,
    su: false
  };
};

const generateColor = () => {
  const randomIndex = getRandomNumber(0, COLORS.length - 1);

  return COLORS[randomIndex];
};

export const generateTask = () => {
  const dueDate = generateDate();
  const repeating = dueDate === null
    ? generateRepeating()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };

  return {
    description: generateDescription(),
    dueDate,
    repeating,
    color: generateColor(),
    isFavorite: Boolean(getRandomNumber(0, 1)),
    isArchive: Boolean(getRandomNumber(0, 1))
  };
};
