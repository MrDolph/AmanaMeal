const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const calendarId = process.env.REACT_APP_GOOGLE_CALENDAR_ID;

export async function fetchGoogleEvents() {
  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?singleEvents=true&maxResults=50&orderBy=startTime&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  return data.items;
}
