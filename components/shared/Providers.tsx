'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  useEffect(() => {
    let cancelled = false;
    async function startMocks() {
      const { initMocks } = await import('@/mocks/init');
      if (!cancelled) await initMocks();
    }
    startMocks();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
