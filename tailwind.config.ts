/* eslint-disable global-require */

import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      // padding: '2rem',
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      mobile: "415px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1441px",
      screen: "1580px",
      max: "1921px",
    },
    extend: {
      colors: {
        "primary-100": "#0059FF",
        "primary-90": "#196AFF",
        "primary-80": "#337AFF",
        "primary-70": "#4C8BFF",
        "primary-60": "#669BFF",
        "primary-50": "#7FACFF",
        "primary-40": "#99BDFF",
        "primary-30": "#B2CDFF",
        "primary-20": "#CCDEFF",
        "primary-10": "#E5EEFF",
        "primary-5": "#F5F8FF",
        "neutral-100": "#030303",
        "neutral-90": "#1A1A1A",
        "neutral-80": "#333333",
        "neutral-70": "#4D4D4D",
        "neutral-60": "#666666",
        "neutral-50": "#808080",
        "neutral-40": "#999999",
        "neutral-30": "#B3B3B3",
        "neutral-20": "#CCCCCC",
        "neutral-10": "#E6E6E6",
        "neutral-5": "#F3F3F3",
        "system-warning": "#FF0000",
        "system-success": "#07A320",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontSize: {
        HB40: [
          "40px",
          {
            fontWeight: 700,
            letterSpacing: "-3%",
            lineHeight: "48px",
          },
        ],
        HB32: [
          "32px",
          {
            fontWeight: 700,
            letterSpacing: "-3%",
            lineHeight: "38px",
          },
        ],
        HB28: [
          "28px",
          {
            fontWeight: 700,
            letterSpacing: "-3%",
            lineHeight: "34px",
          },
        ],
        HB24: [
          "24px",
          {
            fontWeight: 700,
            letterSpacing: "-3%",
            lineHeight: "28px",
          },
        ],
        HB20: [
          "20px",
          {
            fontWeight: 700,
            letterSpacing: "-3%",
            lineHeight: "24px",
          },
        ],
        BB20: [
          "20px",
          {
            fontWeight: 700,
            letterSpacing: "-3%",
            lineHeight: "24px",
          },
        ],
        BM20: [
          "20px",
          {
            fontWeight: 500,
            letterSpacing: "-3%",
            lineHeight: "24px",
          },
        ],
        BR20: [
          "20px",
          {
            fontWeight: 400,
            letterSpacing: "-3%",
            lineHeight: "24px",
          },
        ],
        BB18: [
          "18px",
          {
            fontWeight: 700,
            letterSpacing: "-3%",
            lineHeight: "22px",
          },
        ],
        BM18: [
          "18px",
          {
            fontWeight: 500,
            letterSpacing: "-3%",
            lineHeight: "22px",
          },
        ],
        BR18: [
          "18px",
          {
            fontWeight: 400,
            letterSpacing: "-3%",
            lineHeight: "22px%",
          },
        ],
        BB16: [
          "16px",
          {
            fontWeight: 700,
            letterSpacing: "-3%",
            lineHeight: "20px",
          },
        ],
        BM16: [
          "16px",
          {
            fontWeight: 500,
            letterSpacing: "-3%",
            lineHeight: "20px",
          },
        ],
        BR16: [
          "16px",
          {
            fontWeight: 400,
            letterSpacing: "-3%",
            lineHeight: "20px",
          },
        ],
        BB14: [
          "14px",
          {
            fontWeight: 700,
            letterSpacing: "-3%",
            lineHeight: "18px",
          },
        ],
        BM14: [
          "14px",
          {
            fontWeight: 500,
            letterSpacing: "-3%",
            lineHeight: "18px",
          },
        ],
        BR14: [
          "14px",
          {
            fontWeight: 400,
            letterSpacing: "-3%",
            lineHeight: "18px",
          },
        ],
        BB12: [
          "12px",
          {
            fontWeight: 700,
            letterSpacing: "-3%",
            lineHeight: "16px",
          },
        ],
        BM12: [
          "12px",
          {
            fontWeight: 500,
            letterSpacing: "-3%",
            lineHeight: "16px",
          },
        ],
        BR12: [
          "12px",
          {
            fontWeight: 400,
            letterSpacing: "-3%",
            lineHeight: "16px",
          },
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
