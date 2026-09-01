export async function fetchProfile() {
  const response = await fetch('/api/settings/profile');
  return response.json();
}

export async function updateProfile(profile: unknown) {
  const response = await fetch('/api/settings/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  return response.json();
}
