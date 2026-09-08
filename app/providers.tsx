"use client";

import { useState, useEffect, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const { initMocks } = await import("../mocks/init");
        await initMocks();
      } catch (error) {
        console.error("Failed to initialize MSW:", error);
      } finally {
        if (mounted) {
          setMswReady(true);
        }
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  if (!mswReady) {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-brand-600" />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
