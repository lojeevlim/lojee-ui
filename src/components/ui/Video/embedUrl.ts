/** The player URL for a YouTube or Vimeo page link, or null for anything else (a plain video file). */
export function embedUrl(src: string | undefined, opts: { autoPlay?: boolean; muted?: boolean; loop?: boolean } = {}): string | null {
  if (!src) return null;
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\./, "");
  const flag = (b?: boolean) => (b ? "1" : "0");
  if (host === "youtu.be" || host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
    const id = host === "youtu.be" ? url.pathname.slice(1) : url.pathname.startsWith("/embed/") ? url.pathname.split("/")[2] : url.searchParams.get("v");
    if (!id) return null;
    const params = new URLSearchParams({ autoplay: flag(opts.autoPlay), mute: flag(opts.muted || opts.autoPlay), rel: "0" });
    if (opts.loop) {
      params.set("loop", "1");
      params.set("playlist", id);
    }
    return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
  }
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const id = url.pathname.split("/").filter(Boolean).pop();
    if (!id || !/^\d+$/.test(id)) return null;
    const params = new URLSearchParams({ autoplay: flag(opts.autoPlay), muted: flag(opts.muted || opts.autoPlay), loop: flag(opts.loop) });
    return `https://player.vimeo.com/video/${id}?${params}`;
  }
  return null;
}
