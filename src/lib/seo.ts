import { useEffect } from "react";

const SITE_URL = "https://ognjiste-ljepote-grahovo.lovable.app";
const DEFAULT_IMAGE =
  "https://yjrvyzpqraaljaipflls.supabase.co/storage/v1/object/public/gallery/images/1769273004468-eek897az-24.jpg";

type SEOOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  jsonLdId?: string;
};

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [key, val] = selector.replace(/[\[\]"]/g, "").split("=");
    el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO(opts: SEOOptions) {
  useEffect(() => {
    const url = SITE_URL + opts.path;
    const image = opts.image ?? DEFAULT_IMAGE;
    const type = opts.type ?? "website";

    document.title = opts.title;
    setMeta('meta[name="description"]', "content", opts.description);
    setCanonical(url);

    setMeta('meta[property="og:title"]', "content", opts.title);
    setMeta('meta[property="og:description"]', "content", opts.description);
    setMeta('meta[property="og:type"]', "content", type);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", image);

    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", opts.title);
    setMeta('meta[name="twitter:description"]', "content", opts.description);
    setMeta('meta[name="twitter:image"]', "content", image);

    const scriptId = opts.jsonLdId ?? "ld-page";
    const existing = document.head.querySelector(`script#${scriptId}`);
    if (existing) existing.remove();
    if (opts.jsonLd) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.id = scriptId;
      s.textContent = JSON.stringify(opts.jsonLd);
      document.head.appendChild(s);
    }

    return () => {
      document.head.querySelector(`script#${scriptId}`)?.remove();
    };
  }, [opts.title, opts.description, opts.path, opts.image, opts.type, opts.jsonLdId, JSON.stringify(opts.jsonLd)]);
}

export const SITE_BASE_URL = SITE_URL;
