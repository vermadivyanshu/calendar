import React from 'react';
import EventForDate from './EventForDate'

export default function EventsForDate({events}) {
  return(
    <div className="events-list">
      {events.map((event, index) => 
        <EventForDate key={index} event={event}/>)
      }
    </div>
  );
}