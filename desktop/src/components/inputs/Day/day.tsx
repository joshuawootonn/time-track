import { Component } from 'react'
import moment from 'moment';

interface DayProps {
  value: string;
  onChange: (value: string) => void;
}

export class Day extends Component<DayProps> {

  render() {
    const { value, onChange } = this.props;
    const oneMonthAgo = moment().subtract(1, 'month').format('YYYY-MM-DD');
    const today = moment().format('YYYY-MM-DD');

    return (
      <div className="text-black w-1/4 flex min-w-fit shrink-0 grow-1">
        <input className="h-[36px] md:h-[38px] border border-gray-800 rounded w-full" type="date" min={oneMonthAgo} max={today} value={value} onChange={(event) => onChange(event.target.value)} style={{ borderColor: 'rgb(204, 204, 204)' }} />
      </div>
    );
  }
}

export default Day
