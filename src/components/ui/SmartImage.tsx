import { ImgHTMLAttributes, useState } from "react";

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Optional verified WebP source. When omitted, use the original image. */
  webpSrc?: string;
  /** Set true for above-the-fold images (disables lazy loading). */
  eager?: boolean;
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
  onError,
  ...rest
}: SmartImageProps) {
  const [failedWebp, setFailedWebp] = useState<string | null>(null);
  const webp = webpSrc && webpSrc !== failedWebp ? webpSrc : null;
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
      onError={(event) => {
        if (webp && webp !== src) {
          setFailedWebp(webp);
          return;
        }
        onError?.(event);
      }}
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
