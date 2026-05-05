import { ImgHTMLAttributes } from "react";

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Optional explicit WebP source. If omitted, will auto-derive from src extension. */
  webpSrc?: string;
  /** Set true for above-the-fold images (disables lazy loading). */
  eager?: boolean;
}

const LOCAL_RASTER = /\.(jpe?g|png)(\?.*)?$/i;

function deriveWebp(src: string): string | null {
  // Only auto-derive for local bundled assets (Vite gives hashed urls).
  if (!LOCAL_RASTER.test(src)) return null;
  return src.replace(LOCAL_RASTER, ".webp$2");
}

/**
 * Image component with native lazy loading, async decoding, and optional
 * WebP source via <picture> for better performance.
 *
 * Note: WebP fallback only kicks in when a `webpSrc` is provided, since
 * Vite-bundled assets do not auto-generate WebP variants.
 */
export function SmartImage({
  src,
  alt,
  webpSrc,
  eager = false,
  className,
  ...rest
}: SmartImageProps) {
  const webp = webpSrc ?? deriveWebp(src);
  const loading = eager ? "eager" : "lazy";
  const fetchPriority = eager ? "high" : "auto";

  const imgEl = (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      // @ts-expect-error - fetchpriority is valid HTML, types lag behind
      fetchpriority={fetchPriority}
      className={className}
      {...rest}
    />
  );

  if (!webp || webp === src) return imgEl;

  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      {imgEl}
    </picture>
  );
}

export default SmartImage;
