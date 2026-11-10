# Architecture rules

- SmartImage must use original image URLs unless a WebP source is explicitly provided, and retry the original if that source fails; uploaded and bundled images do not automatically have WebP variants.