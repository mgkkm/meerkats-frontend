import EventInfo from './components/EventInfo';
import MovieInfo from './components/MovieInfo';

export default function EventDetail() {
  return (
    <div className="container xl mt-24 pt-14 bg-white">
      <EventInfo />
      <hr id="dash" />
      <MovieInfo />
    </div>
  );
}
