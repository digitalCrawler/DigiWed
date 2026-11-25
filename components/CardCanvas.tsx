import { CARD_H, CARD_W, CardDesign, resolveColor } from "@/lib/templates";
import { fieldBoxStyle, imageStyle, textStyle } from "@/lib/cardStyle";
import CardArt from "./CardArt";

/**
 * Read-only card renderer. Safe to use in server components (no event handlers).
 * `width` is the rendered width in CSS px; the 1000x1400 artboard is scaled to fit.
 */
export default function CardCanvas({
  design, width = 1000, uid = "a", className = "",
}: { design: CardDesign; width?: number; uid?: string; className?: string }) {
  const scale = width / CARD_W;
  const p = design.palette;

  return (
    <div
      className={className}
      style={{ width, height: CARD_H * scale, position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          width: CARD_W, height: CARD_H, position: "absolute", top: 0, left: 0,
          transform: `scale(${scale})`, transformOrigin: "top left",
          background: p.bg, color: p.ink,
        }}
      >
        <CardArt frame={design.frame} motif={design.motif} texture={design.texture} p={p} uid={uid} />
        {design.fields.map((f) => (
          <div key={f.id} style={fieldBoxStyle(f)}>
            {f.type === "image" ? (
              f.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.src} alt="" style={{ ...imageStyle(f), objectFit: "cover" }} />
              ) : (
                <div
                  style={{
                    ...imageStyle(f),
                    background: `${resolveColor(p, "accent")}14`,
                    border: `2px dashed ${resolveColor(p, "accent")}55`,
                  }}
                />
              )
            ) : (
              <p style={textStyle(f, p)}>{f.text}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
