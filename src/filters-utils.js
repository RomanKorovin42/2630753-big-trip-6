import dayjs from 'dayjs';
import { getCurrentDate } from './utils';


function isFuturePoint(point){
  const date = dayjs(point.dateFrom);
  return dayjs(date).isAfter(getCurrentDate(), 'day');
}

function isPastPoint(point){
  const date = dayjs(point.dateFrom);
  return dayjs(date).isBefore(getCurrentDate(), 'day');
}

function isPresentPoint(point){
  const date = dayjs(point.dateFrom);
  return dayjs(date).isSame(getCurrentDate(), 'day');
}

export {isFuturePoint, isPastPoint, isPresentPoint};
