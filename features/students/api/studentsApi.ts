export async function fetchStudents() {
  const response = await fetch('/api/students');
  return response.json();
}

export async function createStudent(student: unknown) {
  const response = await fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
  return response.json();
}
