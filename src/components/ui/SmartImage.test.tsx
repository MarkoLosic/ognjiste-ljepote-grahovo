import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SmartImage } from "./SmartImage";

describe("SmartImage source selection", () => {
  it("uses the uploaded original without inventing a WebP URL", () => {
    const original = "https://example.com/gallery/photo.jpg";
    render(<SmartImage src={original} alt="Original" eager />);
    const image = screen.getByRole("img");
    expect(image.getAttribute("src")).toBe(original);
    expect(image.closest("picture")).toBeNull();
  });

  it("retries the original when an explicitly supplied WebP fails", () => {
    const onError = vi.fn();
    render(<SmartImage src="/photo.jpg" webpSrc="/photo.webp" alt="Fallback" onError={onError} />);
    const image = screen.getByRole("img");
    expect(image.closest("picture")?.querySelector("source")?.srcset).toBe("/photo.webp");
    fireEvent.error(image);
    expect(screen.getByRole("img").closest("picture")).toBeNull();
    expect(screen.getByRole("img").getAttribute("src")).toBe("/photo.jpg");
    expect(onError).not.toHaveBeenCalled();
    fireEvent.error(screen.getByRole("img"));
    expect(onError).toHaveBeenCalledOnce();
  });
});