import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const CALENDAR_ID = process.env.REACT_APP_GOOGLE_CALENDAR_ID;

export default function GoogleCalendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');
  const today = dayjs();

  const days = [];
  let day = startDate;
  while (day.isBefore(endDate, 'day')) {
    days.push(day);
    day = day.add(1, 'day');
  }

  const isToday = (date) => date.isSame(today, 'day');
  const hasEvent = (date) => events.some(event => dayjs(event.start.dateTime || event.start.date).isSame(date, 'day'));

  const nextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));
  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}&orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.error) {
          setError(data.error.message || 'Failed to load events');
        } else {
          setEvents(data.items || []);
        }
      } catch (err) {
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-sm text-gray-600 hover:text-gray-900">← Previous</button>
        <h2 className="text-lg font-bold">{currentMonth.format('MMMM YYYY')}</h2>
        <button onClick={nextMonth} className="text-sm text-gray-600 hover:text-gray-900">Next →</button>
      </div>

      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm mt-2">
        {days.map((date, idx) => (
          <div
            key={idx}
            className={classNames(
              'p-2 rounded-lg cursor-pointer',
              date.month() !== currentMonth.month() ? 'text-gray-400' : 'text-gray-800',
              isToday(date) && 'bg-teal-500 text-white',
              hasEvent(date) && 'border border-blue-500'
            )}
            onClick={() => {
              const event = events.find(e => dayjs(e.start.dateTime || e.start.date).isSame(date, 'day'));
              if (event) setSelectedEvent(event);
            }}
          >
            {date.date()}
          </div>
        ))}
      </div>

      {loading && <p className="text-center mt-4">Loading events...</p>}
      {error && <p className="text-center mt-4 text-red-600">{error}</p>}

      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
              onClick={() => setSelectedEvent(null)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-2">{selectedEvent.summary}</h3>
            <p className="text-gray-700 mb-4">
              {new Date(selectedEvent.start.dateTime || selectedEvent.start.date).toLocaleString()} -{' '}
              {new Date(selectedEvent.end.dateTime || selectedEvent.end.date).toLocaleString()}
            </p>
            <div
              className="text-gray-800 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: selectedEvent.description || 'No description.' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
