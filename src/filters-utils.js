import dayjs from 'dayjs';
import { getCurrentDate } from './utils';


function isFuturePoint(point){
  const date = dayjs(point.dateFrom);
  return dayjs(date).isAfter(getCurrentDate(), 'minute');
}

function isPastPoint(point){
  const date = dayjs(point.dateFrom);
  return dayjs(date).isBefore(getCurrentDate(), 'millisecond');
}

function isPresentPoint(point){
  return dayjs().isAfter(point.dateFrom, 'minute') && dayjs().isBefore(point.dateTo, 'minute');
}

export {isFuturePoint, isPastPoint, isPresentPoint};
