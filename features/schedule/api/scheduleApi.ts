export async function fetchSchedule() {
  const response = await fetch('/api/schedule');
  return response.json();
}

export async function updateSchedule(schedule: unknown) {
  const response = await fetch('/api/schedule', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(schedule),
  });
  return response.json();
}
