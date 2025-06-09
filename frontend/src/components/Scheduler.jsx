import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { format, parseISO } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

// TODO: replace with dayjs or moment localizer
import { dateFnsLocalizer } from 'react-big-calendar';
const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({ format, parse: parseISO, startOfWeek: () => new Date(), locales });

const DnDCalendar = withDragAndDrop(Calendar);

export default function Scheduler({ googleEvents = [] }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (googleEvents.length) {
      const formatted = googleEvents.map(e => ({
        id: e.id,
        title: e.summary,
        start: new Date(e.start.dateTime || e.start.date),
        end: new Date(e.end.dateTime || e.end.date),
        desc: e.description,
        rrule: e.recurrence ? e.recurrence[0] : null
      }));
      setEvents(formatted);
    }
  }, [googleEvents]);

  const handleSelect = useCallback(({ start, end }) => {
    const title = window.prompt('New event title');
    if (title) {
      setEvents([...events, { id: events.length + 1, title, start, end }]);
    }
  }, [events]);

  const handleEventClick = useCallback((event) => {
    alert(`Title: ${event.title}\nDescription: ${event.desc || 'No description'}`);
  }, []);

  const moveEvent = useCallback(({ event, start, end }) => {
    setEvents(events.map(evt => (
      evt.id === event.id ? { ...evt, start, end } : evt
    )));
  }, [events]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <DnDCalendar
        localizer={localizer}
        events={events}
        defaultView={Views.MONTH}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        selectable
        resizable
        onSelectSlot={handleSelect}
        onSelectEvent={handleEventClick}
        onEventDrop={moveEvent}
        onEventResize={moveEvent}
        style={{ height: 600 }}
      />
    </div>
  );
}
