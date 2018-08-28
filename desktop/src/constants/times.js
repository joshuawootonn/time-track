import moment from 'moment';
export const hours = [
  {
    value: moment.duration(1, 'hours').asMinutes(),
    label: moment.duration(1, 'hours').format('h:mm', { trim: false })
  },
  {
    value: moment.duration(2, 'hours').asMinutes(),
    label: moment.duration(2, 'hours').format('h:mm', { trim: false })
  },
  {
    value: moment.duration(3, 'hours').asMinutes(),
    label: moment.duration(3, 'hours').format('h:mm', { trim: false })
  },
  {
    value: moment.duration(4, 'hours').asMinutes(),
    label: moment.duration(4, 'hours').format('h:mm', { trim: false })
  },
  {
    value: moment.duration(5, 'hours').asMinutes(),
    label: moment.duration(5, 'hours').format('h:mm', { trim: false })
  },
  {
    value: moment.duration(6, 'hours').asMinutes(),
    label: moment.duration(6, 'hours').format('h:mm', { trim: false })
  },
  {
    value: moment.duration(7, 'hours').asMinutes(),
    label: moment.duration(7, 'hours').format('h:mm', { trim: false })
  },
  {
    value: moment.duration(8, 'hours').asMinutes(),
    label: moment.duration(8, 'hours').format('h:mm', { trim: false })
  },
  {
    value: moment.duration(9, 'hours').asMinutes(),
    label: moment.duration(9, 'hours').format('h:mm', { trim: false })
  },
  {
    value: moment.duration(10, 'hours').asMinutes(),
    label: moment.duration(10, 'hours').format('h:mm', { trim: false })
  },
  {
    value: moment.duration(11, 'hours').asMinutes(),
    label: moment.duration(11, 'hours').format('h:mm', { trim: false })
  },
  {
    value: moment.duration(12, 'hours').asMinutes(),
    label: moment.duration(12, 'hours').format('h:mm', { trim: false })
  },
];

export const minutes = [
  {
    value: moment.duration(0, 'hours').asMinutes(),
    label: moment.duration(0, 'hours').format('h:mm', { trim: false })
  },{
    value: moment.duration(0.25, 'hours').asMinutes(),
    label: moment.duration(0.25, 'hours').format('h:mm', { trim: false })
  },
  {
    value: moment.duration(0.5, 'hours').asMinutes(),
    label: moment.duration(0.5, 'hours').format('h:mm', { trim: false })
  },{
    value: moment.duration(0.75, 'hours').asMinutes(),
    label: moment.duration(0.75, 'hours').format('h:mm', { trim: false })
  },
];
