import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const CALENDAR_ID = process.env.REACT_APP_GOOGLE_CALENDAR_ID;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  // Date helpers for calendar grid
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
  const hasEvent = (date) =>
    events.some(event => {
      const eventDate = event.start.dateTime || event.start.date;
      return dayjs(eventDate).isSame(date, 'day');
    });

  const nextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));
  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));

  useEffect(() => {
    const loadGapiClient = () => {
      return new Promise((resolve, reject) => {
        if (window.gapi) {
          window.gapi.load('client:auth2', resolve);
        } else {
          reject(new Error('Google API script not loaded'));
        }
      });
    };

    const initClient = async () => {
        try {
            await window.gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
            });

            const authInstance = window.gapi.auth2.getAuthInstance();

            if (!authInstance) {
            throw new Error("Google Auth instance not available.");
            }

            if (!authInstance.isSignedIn.get()) {
            await authInstance.signIn();
            }

            // Fetch events after sign-in
            const response = await window.gapi.client.calendar.events.list({
            calendarId: CALENDAR_ID,
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 50,
            orderBy: 'startTime',
            });

            setEvents(response.result.items);
        } catch (err) {
            console.error('Error during Google API client init or event fetch:', err);
            setError(err.message);
        }
    };


    loadGapiClient()
      .then(initClient)
      .catch(err => {
        console.error('Failed to load gapi client:', err);
        setError(err.message);
      });
  }, []);

  if (error) return <div className="text-red-600 p-4">Error: {error}</div>;

  return (
    <div className="w-full mx-auto p-8 mt-0 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-sm text-gray-600 hover:text-gray-900">
          ← Previous
        </button>
        <h2 className="text-lg font-bold">{currentMonth.format('MMMM YYYY')}</h2>
        <button onClick={nextMonth} className="text-sm text-gray-600 hover:text-gray-900">
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
            className={classNames(
              'p-2 rounded-lg cursor-pointer',
              date.month() !== currentMonth.month() ? 'text-gray-400' : 'text-gray-800',
              isToday(date) && 'bg-teal-500 text-white',
              hasEvent(date) && 'border border-blue-500'
            )}
            title={events
              .filter(event => {
                const eventDate = event.start.dateTime || event.start.date;
                return dayjs(eventDate).isSame(date, 'day');
              })
              .map(event => event.summary)
              .join(', ')}
          >
            {date.date()}
          </div>
        ))}
      </div>
    </div>
  );
}
