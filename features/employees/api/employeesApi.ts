export async function fetchEmployees() {
  const response = await fetch('/api/employees');
  return response.json();
}

export async function createEmployee(employee: unknown) {
  const response = await fetch('/api/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  return response.json();
}
