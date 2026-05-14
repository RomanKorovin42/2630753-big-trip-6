import dayjs from 'dayjs';
import { getTimeDifferenceMinutes } from './utils';


const sortEventDate = (taskA, taskB) => dayjs(taskA.dueDate).diff(dayjs(taskB.dueDate));

const sortEventTime = (taskA, taskB) => {
  const timeOne = getTimeDifferenceMinutes(taskA.startTime, taskA.endTime);
  const timeTwo = getTimeDifferenceMinutes(taskB.startTime, taskB.endTime);
  return timeTwo - timeOne;
};

const sortEventPrice = (taskA, taskB) => taskB.price - taskA.price;

const sortStats = (taskA, taskB) => taskB[1] - taskA[1];

export { sortEventDate, sortEventTime, sortEventPrice, sortStats};
