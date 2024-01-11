import { Component } from 'react'
import moment from 'moment';

export class Day extends Component {

  render() {
    const { value, onChange } = this.props;
    const oneMonthAgo = moment().subtract(1, 'month').format('YYYY-MM-DD');
    const today = moment().format('YYYY-MM-DD');

    return (
      <div className="text-black">
        <input className="h-[36px] md:h-[38px] border border-gray-800 rounded" type="date" min={oneMonthAgo} max={today} value={value} onChange={(event) => onChange(event.target.value)} style={{ borderColor: 'rgb(204, 204, 204)' }} />
      </div>
    );
  }
}

export default Day
