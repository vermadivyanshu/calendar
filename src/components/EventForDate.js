import React from 'react';

export default function EventForDate({event}) {
  return(
    <div className="event">
      <p>{event.start} - {event.end}</p>
      <p>{event.name}</p>
    </div>
  );
}