export async function fetchDashboardStats() {
  const response = await fetch('/api/dashboard/stats');
  return response.json();
}
