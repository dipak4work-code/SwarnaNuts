import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";
export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// TODO: replace with a real brand image (drop an opengraph-image.png in /app to override this file).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0F3D30",
          color: "#F6E9C9",
        }}
      >
        <div style={{ fontSize: 120, color: "#E9B23C" }}>{siteConfig.name}</div>
        <div style={{ fontSize: 44, marginTop: 24 }}>Know your kaju by its number.</div>
        <div style={{ fontSize: 32, marginTop: 16, color: "#BCD0C3" }}>{siteConfig.tagline}</div>
      </div>
    ),
    size,
  );
}
