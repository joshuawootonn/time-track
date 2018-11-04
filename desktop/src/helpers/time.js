import moment from 'moment';

export const minutesToString = minutes => { 
  if (minutes !== 0 && !minutes) return '';
  const m = Math.floor(minutes%60);
  const hoursString = Math.floor(minutes/60);
  const minutesString = m > 10 ? m : '0' + m;
  return `${hoursString}:${minutesString}`;
};

export const currentRoundedTime = () =>{ 
  return moment().minute(Math.round(moment().minute() / 15) * 15).second(0);
};

export const minutesRoudedTime = minutes => {
  return Math.round(minutes / 15) * 15;
};