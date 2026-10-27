// Fetches the Medium RSS feed at build time. The site is a static export, so
// there is no server at runtime, and Medium's feed sends no CORS headers, so the
// browser cannot fetch it directly. Posts refresh on each (scheduled) deploy.

export interface MediumPost {
  title: string;
  pubDate: string; // "YYYY-MM-DD HH:mm:ss" (UTC)
  link: string;
  guid: string;
  thumbnail: string;
  categories: string[];
}

const MEDIUM_FEED_URL = "https://medium.com/feed/sliitwif";
export const FALLBACK_IMAGE = "/assets/logo.png";

const decodeEntities = (text: string) =>
  text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");

const stripCdata = (text: string) =>
  text.replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1").trim();

const getTag = (xml: string, tag: string) => {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? stripCdata(match[1]) : "";
};

const getAllTags = (xml: string, tag: string) =>
  [...xml.matchAll(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "g"))].map(
    (match) => decodeEntities(stripCdata(match[1]))
  );

const formatDate = (rfc822: string) => {
  const date = new Date(rfc822);
  if (Number.isNaN(date.getTime())) return rfc822;
  return date.toISOString().replace("T", " ").slice(0, 19);
};

export async function getMediumPosts(): Promise<MediumPost[]> {
  const res = await fetch(MEDIUM_FEED_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch Medium feed: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();

  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
  // Fail the build rather than deploy an empty blog list
  if (items.length === 0) {
    throw new Error("Medium feed returned no posts");
  }

  return items.map(([, item]) => {
    const content = getTag(item, "content:encoded");
    // Medium appends a tracking pixel, so skip it when picking a thumbnail
    const image = [...content.matchAll(/<img[^>]+src="([^">]+)"/g)]
      .map((match) => match[1])
      .find((src) => !src.includes("stat?event") && !src.includes("medium.com/_/stat"));

    return {
      title: decodeEntities(getTag(item, "title")),
      pubDate: formatDate(getTag(item, "pubDate")),
      link: getTag(item, "link"),
      guid: getTag(item, "guid"),
      thumbnail: image || FALLBACK_IMAGE,
      categories: getAllTags(item, "category"),
    };
  });
}
