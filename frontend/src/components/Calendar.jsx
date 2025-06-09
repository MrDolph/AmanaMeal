import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { fetchGoogleEvents } from '../utils/googleApi';
import classNames from 'classnames';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const today = dayjs();

  const days = [];
  let day = startDate;

  while (day.isBefore(endDate, 'day') || day.isSame(endDate, 'day')) {
    days.push(day);
    day = day.add(1, 'day');
  }

  const isToday = (date) => date.isSame(today, 'day');

  // Check if date has any event
  const hasEvent = (date) =>
    events.some((event) => {
      const eventDate = event.start.dateTime || event.start.date;
      return dayjs(eventDate).isSame(date, 'day');
    });

  // Get events on a specific date
  const eventsOnDate = (date) =>
    events.filter((event) => {
      const eventDate = event.start.dateTime || event.start.date;
      return dayjs(eventDate).isSame(date, 'day');
    });

  const nextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));
  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));

  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const calendarId = process.env.REACT_APP_GOOGLE_CALENDAR_ID;

    fetchGoogleEvents(calendarId, apiKey)
      .then(setEvents)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          ← Previous
        </button>
        <h2 className="text-lg font-bold">{currentMonth.format('MMMM YYYY')}</h2>
        <button
          onClick={nextMonth}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Next →
        </button>
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
            onClick={() => {
              if (hasEvent(date)) setSelectedEvent(eventsOnDate(date));
              else setSelectedEvent(null);
            }}
            className={classNames(
              'p-2 rounded-lg cursor-pointer',
              date.month() !== currentMonth.month()
                ? 'text-gray-400'
                : 'text-gray-800',
              isToday(date) && 'bg-teal-500 text-white',
              hasEvent(date) && 'border border-blue-500'
            )}
          >
            {date.date()}
          </div>
        ))}
      </div>

      {/* Event modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-lg">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 font-bold"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Events</h3>
            {selectedEvent.map((event) => (
              <div key={event.id} className="mb-3 border-b pb-2">
                <p className="font-semibold">{event.summary}</p>
                <p className="text-xs text-gray-600">
                  {dayjs(event.start.dateTime || event.start.date).format('MMM D, YYYY h:mm A')}
                </p>
                <p>{event.description || 'No description'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
