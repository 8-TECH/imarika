import axios from 'axios';
import { useEffect, useState } from 'react';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/events/upcoming/')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="events" className="py-16 px-6 bg-white" data-aos="fade-up">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Upcoming Events</h2>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No upcoming events at the moment.</p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-2xl font-bold text-blue-700 mb-2">{event.title}</h3>
              <p className="text-gray-700 mb-1">{event.description}</p>
              <p className="text-sm text-gray-600">
                {new Date(event.event_date).toDateString()} • {event.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UpcomingEvents;
