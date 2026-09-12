import Script from "next/script";

const TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

export function CloudflareWebAnalytics() {
  if (!TOKEN) return null;

  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: TOKEN, spa: true })}
      strategy="afterInteractive"
    />
  );
}
