import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import '../styles/newEvent.css';
import formatDayOrMonth from '../utils/formatDayOrMonth'
import { Typography } from '@material-ui/core';
import moment from 'moment';

export default class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      name: '',
      date: '' + props.year + formatDayOrMonth(props.month) + formatDayOrMonth(props.date),
      start: '',
      end: ''
    }
  }
  validate = () => {
    if(this.state.length === 0 || this.state.start === 0 || this.state.end === 0) {
      this.setState(prevState => Object.assign(prevState, {error: 'All fields are required'}));
      return false;
    }
    else {
      let start = moment(this.state.date+" "+this.state.start+':00', "YYYYMMDD HH:mm:ss");
      let end = moment(this.state.date+" " +this.state.end+':00', "YYYYMMDD HH:mm:ss");
      if(!(start.isBefore(end))) {
        this.setState(prevState => Object.assign(prevState, {error: 'Start time should be before end time'}));
        return false;
      }
      else {
        this.setState(prevState => Object.assign(prevState, {error: null}));
        return true;
      }
    }
    
  }
  onFormSubmit = (event) => {
    event.preventDefault();
    // do something with state
    if(this.validate()) {
      var eventsForDate = JSON.parse(window.localStorage.getItem(this.state.date)) || []
      eventsForDate.push(this.state)
      window.localStorage.setItem(this.state.date.toString(), JSON.stringify(eventsForDate));
      this.props.onCreateSuccess()
    }
  }
  updateState = (attrName, value) => {
    this.setState(prevState => {
      var newState = {};
      newState[attrName] = value
      return Object.assign(prevState, newState)
    })
  }
  render() {
    return(
      <div className="new-event">
        <Box mx={1}>
        <Typography component="div" variant="h5">Create Event</Typography>
        </Box>
        
        <form onSubmit={(event) => this.onFormSubmit(event)}>
          <div className="error">{this.state.error}</div>
          <Box display="flex" flexDirection="column" m={1}>
            <Box m={1}>
              <TextField value={this.state.name } label="Name" onChange={(event)=> this.updateState('name', event.target.value)} />
            </Box>
            <Box m={1}>
              <TextField value={this.state.date } label="Date" readOnly={true} />
            </Box>
            <Box m={1}>
              <Box display="flex" flexDirection="row">
                <Box mr={1}>
                  <TextField
                    id="start-time"
                    label="Start"
                    type="time"
                    value={this.state.start}
                    onChange={(event) => this.updateState( 'start', event.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    id="end-time"
                    label="End"
                    type="time"
                    value={this.state.end}
                    onChange={(event) => this.updateState( 'end', event.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box m={1} textAlign="center"><Button type="submit" color="primary" variant="contained">Save Event</Button></Box>
          </Box>
        </form>
      </div>
    );
  }
}