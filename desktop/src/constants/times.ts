import moment from 'moment';
import { range } from 'lodash';

interface Time {
  id: number;
  value: number;
  name: string;
}

export const hours: Time[] = range(0, 17).map(number => {
  const durationOfCurrentNumber = moment.duration(number, 'hours');
  return {
    id: number,
    value: durationOfCurrentNumber.asMinutes(),
    name: durationOfCurrentNumber.asHours().toString()
  };
});

export const minutes: Time[] = range(0, 4).map(number => {
  const durationOfCurrentNumber = moment.duration(number * 0.25, 'hours');
  return {
    id: number * 0.25,
    value: durationOfCurrentNumber.asMinutes(),
    name: durationOfCurrentNumber.asMinutes().toString()
  };
});
