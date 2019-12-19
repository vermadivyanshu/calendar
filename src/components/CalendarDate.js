import React from 'react';
import EventsForDay from './EventsForDate'
import formatDayOrMonth from '../utils/formatDayOrMonth'

export default class CalendarMonth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: JSON.parse(
        window.localStorage.getItem(
          ''+this.props.year+formatDayOrMonth(''+this.props.month)+formatDayOrMonth(this.props.date)
        )
      ) || []
    }
  }
  static getDerivedStateFromProps(props, state) {
    return {
      events: JSON.parse(
        window.localStorage.getItem(
          ''+props.year+formatDayOrMonth(''+props.month)+formatDayOrMonth(props.date)
        )
      ) || []
    }
  }
  handleOnClick = () => {
    if(this.props.date && this.props.month && this.props.year) {
      this.props.onClickDay(this.props.date, formatDayOrMonth(this.props.month), this.props.year);
    }
  }
  render() {
    return(
      <div className="date-cell" onClick={ this.handleOnClick } >
        <p>{this.props.date}</p>
        {this.state.events.length > 0 &&
          <EventsForDay events={this.state.events} />
        }
      </div>
    )
  }
}