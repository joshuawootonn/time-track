import { minutesRoudedTime,minutesToString,currentRoundedTime } from 'helpers/time';

describe(`Time Helper`, () => {  
  it(`should return current time in moment object form for currentRoundedTime`, () => {
    expect(typeof currentRoundedTime()).toBe(`object`);
  });
  it(`should return rouded minutes count for minutesRoundedTime`, () => {
    expect(minutesRoudedTime(52)).toEqual(45);
    expect(minutesRoudedTime(53)).toEqual(60);
  });
  it(`should return string format for number of minutes for minutesToString`, () => {
    expect(minutesToString(54)).toEqual(`0:54`);
    expect(minutesToString(4)).toEqual(`0:04`);
    expect(minutesToString(90)).toEqual(`1:30`);
    expect(minutesToString(0)).toEqual(`0:00`);
    expect(minutesToString(-10)).toEqual(`-0:10`);    
    expect(minutesToString(-90)).toEqual(`-1:30`);
    expect(minutesToString()).toEqual(`0:00`);
  });
});