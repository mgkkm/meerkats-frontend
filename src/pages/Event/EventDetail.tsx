import EventInfo from './components/EventInfo';
import MovieInfo from './components/MovieInfo';
import EmailInput from './components/EmailInput';

export default function EventDetail() {
  return (
    <div className="container xl mt-24  pt-14 bg-white">
      <EventInfo />
      <hr id="dash" />
      <EmailInput />
      <MovieInfo />
    </div>
  );
}
