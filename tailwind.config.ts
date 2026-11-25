import type { Config } from "tailwindcss";

/**
 * VERDURE — a garden at dusk
 * Nature/Organic, 2020s contemporary. Light theme.
 *
 * The token NAMES are kept from the first build so every component picks the
 * new palette up without a rewrite; only the values moved to VERDURE. Where a
 * name reads oddly now (`marigold` is brass, `henna` is deep moss) the alias
 * below says what it actually is.
 */
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* --- VERDURE core --- */
        cream: "#f3ecd9",      // primary — parchment
        parchment: "#faf6ea",  // lifted surface
        sage: "#7d9273",       // secondary — mid green
        moss: "#55673f",       // tertiary — deep green
        brass: "#b08d3e",      // metallic accent
        rose: "#c98d8d",       // dusty rose accent
        ink: "#26301f",        // text — near-black green
        dusk: "#3f4e2f",       // deep shade for hovers

        /* --- aliases kept so existing classes keep working --- */
        blush: "#e4e8d7",      // soft sage panel (was pink)
        marigold: "#b08d3e",   // = brass
        gold: "#b08d3e",       // = brass
        henna: "#3f4e2f",      // = dusk
      },
      fontFamily: {
        display: ["Georgia", '"Times New Roman"', "serif"],
        body: ["Georgia", '"Times New Roman"', "serif"],
        ui: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        script: ['"Great Vibes"', "cursive"],
        deva: ['"Tiro Devanagari Hindi"', "serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl2: "16px",
        leaf: "16px 4px 16px 4px",
        petal: "16px 16px 4px 16px",
      },
      spacing: {
        sm: "1rem",
        md: "2rem",
        lg: "4rem",
      },
      boxShadow: {
        soft: "0 6px 20px -8px rgba(38, 48, 31, 0.22)",
        lift: "0 18px 44px -18px rgba(38, 48, 31, 0.38)",
        bloom: "0 0 0 1px rgba(125, 146, 115, 0.25), 0 10px 30px -12px rgba(85, 103, 63, 0.4)",
      },
      backgroundImage: {
        dusk: "linear-gradient(160deg, #55673f 0%, #7d9273 55%, #b08d3e 140%)",
        petalgrad: "linear-gradient(145deg, #c98d8d 0%, #b08d3e 120%)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bloom: {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-120% 0" },
          "100%": { backgroundPosition: "220% 0" },
        },
        grow: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        bloom: "bloom 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        sway: "sway 6s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite",
        shimmer: "shimmer 1.1s ease-out",
        grow: "grow 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
