import { ImageResponse } from "next/og";
import { CATEGORIES, TEMPLATES } from "@/lib/templates";

export const alt =
  "DigiWeds — free wedding invitation card maker for every faith";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 86px",
          background: "linear-gradient(150deg, #f3ecd9 0%, #e4e8d7 52%, #cfd8c4 100%)",
          fontFamily: "Georgia, serif",
          color: "#26301f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#55673f" }}>
          <span>💐</span>
          <span style={{ letterSpacing: 5 }}>DIGIWEDS</span>
        </div>

        <div style={{ display: "flex", fontSize: 70, lineHeight: 1.12, marginTop: 26, fontWeight: 700 }}>
          Shaadi ka card banaiye —
        </div>
        <div style={{ display: "flex", fontSize: 70, lineHeight: 1.12, color: "#55673f", fontWeight: 700 }}>
          har rasm ke liye
        </div>

        <div style={{ display: "flex", fontSize: 29, marginTop: 30, color: "#3f4e2f" }}>
          {TEMPLATES.length} free editable templates · {CATEGORIES.length} categories · HD download
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 34, flexWrap: "wrap" }}>
          {["Hindu", "Nikah", "Christian", "Anand Karaj", "Jain", "Buddhist", "Interfaith"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                background: "rgba(250,246,234,0.85)",
                border: "1px solid rgba(85,103,63,0.28)",
                fontSize: 24,
                color: "#26301f",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
