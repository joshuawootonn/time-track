import moment from 'moment';

export const minutesToString = minutes => { 
  if (minutes !== 0 && !minutes) return '';
  const m = Math.abs(Math.floor(minutes%60));
  // wack fix for floor taking -1.5 to -2. use ceil for numbers less than 0
  const hoursString = minutes <= 0 ? Math.ceil(minutes/60) : Math.floor(minutes/60);
  const minutesString = m > 10 ? m : '0' + m;
  return `${hoursString}:${minutesString}`;
};

export const currentRoundedTime = () =>{ 
  return moment().minute(Math.round(moment().minute() / 15) * 15).second(0);
};

export const minutesRoudedTime = minutes => {
  return Math.round(minutes / 15) * 15;
};