import { site } from "@/lib/site";

/**
 * AdSense reads /ads.txt to confirm you are allowed to sell this site's
 * inventory. It is generated from the same publisher id the ad script uses,
 * so the two can never disagree.
 */
export const dynamic = "force-static";

export function GET() {
  const client = site.adsense.client.trim();
  // the ad script wants "ca-pub-…", ads.txt wants the bare "pub-…"
  const publisher = client.replace(/^ca-/i, "");

  const body = publisher
    ? `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`
    : "# No AdSense publisher id configured yet.\n" +
      "# Set NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX and redeploy.\n";

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
