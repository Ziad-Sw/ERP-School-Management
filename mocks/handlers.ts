import { http, HttpResponse } from 'msw';

export const handlers = [
  // Handlers will be added per-feature.
  http.get('/api/health', () => HttpResponse.json({ status: 'ok' })),
];
