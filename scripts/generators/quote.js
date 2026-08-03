import syncFetch from 'sync-fetch';

export default function() {
  const response = syncFetch('https://zenquotes.io/api/today');
  if (!response.ok) {
    console.warn(`HTTP Error: ${response.statusText}`);
    return '';
  }

  const json = response.json()[0];
  return `### *${json.h}*`;
}