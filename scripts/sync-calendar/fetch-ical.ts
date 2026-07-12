export async function fetchIcal(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: { Accept: "text/calendar" },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} fetching calendar feed`);
  }

  return response.text();
}
