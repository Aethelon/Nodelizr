import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "80px",
          background:
            "radial-gradient(1200px 600px at 15% 0%, #17321a 0%, #0f0f0f 55%)",
          color: "#f8f9fa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "#5fa04e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: 900,
              color: "#0a0a0a",
            }}
          >
            N
          </div>
          <div style={{ display: "flex", fontSize: "64px", fontWeight: 800 }}>
            <span style={{ color: "#5fa04e" }}>NODE</span>
            <span>LIZR</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "40px",
            fontSize: "60px",
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          Generate Node.js projects instantly.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "28px",
            fontSize: "30px",
            color: "#8a9a86",
            maxWidth: "920px",
          }}
        >
          Scaffold Express, Fastify, CLI &amp; worker boilerplates with curated
          dependencies — download a ready-to-run ZIP in seconds.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "48px",
            fontSize: "26px",
            color: "#f8f9fa",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: "9999px",
              border: "2px solid #5fa04e",
              color: "#5fa04e",
              fontWeight: 700,
            }}
          >
            Free &amp; open-source
          </div>
          <span style={{ color: "#8a9a86" }}>nodelizr</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
