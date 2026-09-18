type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';

export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const isJson = response.headers
    .get('content-type')
    ?.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status,
      data
    );
  }

  return data as T;
}
