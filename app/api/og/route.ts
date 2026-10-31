import type { NextRequest } from "next/server";

const PRIVATE_HOST =
  /^(localhost|.*\.local|.*\.internal|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|0\.|\[?::1\]?$|\[?f[cd][0-9a-f]{2}:)/i;

function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function getMeta(html: string, keys: string[]): string | undefined {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const key = /(?:property|name)\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1]?.toLowerCase();
    if (!key || !keys.includes(key)) continue;
    const content = /content\s*=\s*"([^"]*)"|content\s*=\s*'([^']*)'/i.exec(tag);
    const value = content?.[1] ?? content?.[2];
    if (value) return decode(value);
  }
}

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("url");
  let url: URL;
  try {
    url = new URL(target ?? "");
  } catch {
    return Response.json({ error: "올바른 URL이 아닙니다." }, { status: 400 });
  }
  if (!/^https?:$/.test(url.protocol) || PRIVATE_HOST.test(url.hostname)) {
    return Response.json({ error: "허용되지 않는 URL입니다." }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0)", accept: "text/html" },
      signal: AbortSignal.timeout(5000),
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`status ${res.status}`);

    const html = (await res.text()).slice(0, 500_000);
    const titleTag = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1];
    const title =
      getMeta(html, ["og:title", "twitter:title"]) ??
      (titleTag ? decode(titleTag) : undefined) ??
      url.hostname;
    const description = getMeta(html, ["og:description", "twitter:description", "description"]) ?? "";
    const image = getMeta(html, ["og:image", "og:image:url", "twitter:image"]);

    let thumbnail: string | null = null;
    if (image) {
      try {
        thumbnail = new URL(image, res.url || url).toString();
      } catch {
        thumbnail = null;
      }
    }

    return Response.json({ title, description, thumbnail, url: url.toString() });
  } catch {
    return Response.json({ error: "페이지 정보를 가져오지 못했습니다." }, { status: 502 });
  }
}
