export async function initMocks() {
  if (typeof window === "undefined") {
    return;
  }

  if (process.env.NEXT_PUBLIC_API_MOCKING === "disabled") {
    return;
  }

  const { worker } = await import("./browser");
  await worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  });
}
