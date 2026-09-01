export async function fetchExams() {
  const response = await fetch('/api/exams');
  return response.json();
}

export async function createExam(exam: unknown) {
  const response = await fetch('/api/exams', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exam),
  });
  return response.json();
}
