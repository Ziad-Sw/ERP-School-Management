export async function fetchTeachers() {
  const response = await fetch('/api/teachers');
  return response.json();
}

export async function createTeacher(teacher: unknown) {
  const response = await fetch('/api/teachers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(teacher),
  });
  return response.json();
}
