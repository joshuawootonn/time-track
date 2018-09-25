import moment from 'moment'

export const minutesToString = minutes => { 
  const m = Math.floor(minutes%60);
  const hoursString = Math.round(minutes/60);
  const minutesString = m > 10 ? m : '0' + m;
  return `${hoursString}:${minutesString}`;
};

export const currentRoundedTime = () =>{ 
  return moment().minute(Math.round(moment().minute() / 15) * 15).second(0)
}