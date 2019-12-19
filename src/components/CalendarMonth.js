import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import moment from 'moment';
import CalendarDate from './CalendarDate';
import "../styles/calendarMonth.css";
import formatDayOrMonth from '../utils/formatDayOrMonth'

export default class CalendarMonth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    }
  }
  static getDerivedStateFromProps(props, state) {
    return {
      weekDays: state.weekDays,
      start: moment(''+props.year+formatDayOrMonth(props.month)+'01').startOf('day'),
      end: moment(''+props.year+formatDayOrMonth(props.month)+'01').endOf('month').startOf('day'),
    }
  }

  getDayRange = () => {
    var endDay = this.state.end.date();
    var startDay = this.state.start.date();
    var i;
    const range = (start, end, length = end - start + 1) =>
      Array.from({ length }, (_, i) => start + i)
    var dayRange = range(startDay, endDay);

    var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    var dateCells = []
    var indexOfStartDay = weekDays.indexOf(this.state.start.format('ddd'));
    for(i = 0; i< indexOfStartDay; i++) {
      dateCells.push('');
    }
    dateCells.push(...dayRange)
    var indexOfEndDay = weekDays.indexOf(this.state.end.format('ddd'));
    for(i = indexOfEndDay + 1; i< weekDays.length; i++) {
      dateCells.push('');
    }
    return dateCells;

  }
  render() {
    var formattedTitle = moment(''+this.props.year+formatDayOrMonth(this.props.month)+'01').format('MMMM') + ' ' + this.props.year;
    return (
      <div className="calendar-month">
        <GridList cellHeight={120} spacing={0} className="grid-list" cols={7}>
          <GridListTile key="Subheader" cols={7} style={{ height: 'auto' }} className="month-heading">
            <ListSubheader component="div">{formattedTitle}</ListSubheader>
          </GridListTile>
          {this.state.weekDays.map((weekDay, index) => {
            var classNames = "day-of-week";
            if(index >=0 && index < 7) {
              classNames+= " top-row";
            }
            if(((index + 1) % 7 ) === 0) {
              classNames+= " last-col";
            }
            return (<GridListTile key={index} style={{ height: 'auto' }} className={classNames}>
              <ListSubheader component="div">{weekDay}</ListSubheader>
              </GridListTile>
            )})
          }
          {this.getDayRange().map((day, index) => {
            var classNames = "date";
            if(index >=0 && index < 7) {
              classNames+= " top-row";
            }
            if(((index + 1 )% 7) === 0) {
              classNames+= " last-col";
            }
            return (<GridListTile key={index} m={0} p={0} className={classNames}>
              <CalendarDate date={day} month={this.props.month} year={this.props.year} onClickDay={this.props.onClickDay}/>
            </GridListTile>
          ) } ) }

        </GridList>
      </div>
    );
  }

}
