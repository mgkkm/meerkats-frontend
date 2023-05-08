import React from 'react';
import EventInfo from './components/EventInfo';
import MovieInfo from './components/MovieInfo';
import EmailInput from './components/EmailInput';

export default function EventDetail() {
  return (
    <div className="container xl mt-28  py-14 bg-white">
      <EventInfo />
      <EmailInput />
      <MovieInfo />
    </div>
  );
}
