import React from 'react'
import moment from 'moment'
import CalendarMonth from './CalendarMonth'
import NewEvent from './NewEvent';
import '../styles/Calendar.css'
import Modal from '@material-ui/core/Modal'
import formattedDayOrMonth from '../utils/formatDayOrMonth'
import DialogContent from '@material-ui/core/DialogContent'

export default class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpenModal: false,
      selectedDate: null,
      selectedMonth: null,
      selectedYear: null,
      lastUpdatedDate: null,
      months: [{month: moment().month()+1, year: moment().year()}],
    }
  }
  appendMonth = () => {
    var months = this.state.months.slice();
    var lastMonth = months[months.length - 1];
    var nextMonth = moment(''+lastMonth.year+formattedDayOrMonth(lastMonth.month)+"01", "YYYYMMDD").add(1,'months');
    months.push({month: nextMonth.month()+1, year: nextMonth.year()});
    this.setState(prevState => Object.assign(prevState, { months }));
  }
  prependMonth = () => {
    var months = this.state.months.slice();
    var startMonth = months[0];
    var prevMonth = moment(''+startMonth.year+formattedDayOrMonth(startMonth.month)+"01", "YYYYMMDD").subtract(1,'months');
    months = [{month: prevMonth.month()+1, year: prevMonth.year()}, ...months];
    this.setState(prevState => Object.assign(prevState, { months }))
  }
  handleScroll = (event) => {
    var element = event.currentTarget;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.appendMonth()
    }
    else if (element.scrollTop === 0) {
      this.prependMonth()
    }
  }
  closeModal = () => {
    (this.setState(prevState => Object.assign(prevState, { isOpenModal: false })))
  }
  setSelectedDateAndOpenModal = (selectedDate, selectedMonth, selectedYear) => {
    return this.setState(prevState => Object.assign(prevState, {isOpenModal: true,selectedDate, selectedMonth, selectedYear}));
  }
  render() {
    return(
      <div className="calendar" onScroll={this.handleScroll}>
        {this.state.months.map((element, index) => {
          return (
            <CalendarMonth key={index} month={element.month} year={element.year} onClickDay={this.setSelectedDateAndOpenModal} />
          )})}
        <Modal
          open={this.state.isOpenModal}
          onClose={this.closeModal}
          className="new-event-modal"
        >
          <DialogContent>
            <NewEvent tabIndex={-1} date={ this.state.selectedDate } month={ this.state.selectedMonth }  year={ this.state.selectedYear } onCreateSuccess= { () => this.closeModal() } />
          </DialogContent>
        </Modal>
      </div>
    );
  }
}