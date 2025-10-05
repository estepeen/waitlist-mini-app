const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  "accountAssociation": {
    "header": "eyJmaWQiOjEzNDY0NTcsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhjMDJFRjU0QTA3MzI3MWVEOUFCMDQ1NWQ4QmNCZjU2NGNCNjExMjJEIn0",
    "payload": "eyJkb21haW4iOiJ3YWl0bGlzdC1taW5pLWFwcC1ndWxlcy52ZXJjZWwuYXBwIn0",
    "signature": "MHhmZDNjZDUyYzlkNGM4Yzk2MmRjZmFmMjMxM2Y2OTViYjFkNjI1NWFiY2NhYjlhN2I5ZWQyZTQzMGY3ZmE1MDE3M2VkMzNkOGQ5NWVjMDU1YmJiOWQzZjA0MzIxZTdlZDg1MTQwNTIzMTYyZGM3MzY4MDFhMDVjN2U5MDBiOGFhMjFi"
  },
  "baseBuilder": {
    "allowedAddresses": ["0x69bb429ce2e3ECd3044BA17d1C5805eDD136D9db"]
  },
  frame: {
    version: "1",
    name: "Skadi", 
    noindex: true, 
    subtitle: "The only crypto tool you need", 
    description: "AI assistant for crypto",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/blue-icon.png`,
    splashImageUrl: `${ROOT_URL}/blue-hero.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["marketing", "ads", "quickstart", "waitlist", "nfts"],
    heroImageUrl: `${ROOT_URL}/blue-hero.png`, 
    tagline: "",
    ogTitle: "",
    ogDescription: "",
    ogImageUrl: `${ROOT_URL}/blue-hero.png`,
  },
} as const;

