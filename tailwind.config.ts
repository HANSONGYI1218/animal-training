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
      backgroundImage: {
        "grass-pattern": "url('/images/curriculum/grass.jpg')",
        "dog-communication-pattern":
          "url('/images/curriculum/dog-communication.jpg')",
        "dog-training-pattern": "url('/images/curriculum/dog-training.jpg')",
        "dog-beauty-pattern": "url('/images/curriculum/dog-beauty.jpg')",
        "cat-communication-pattern":
          "url('/images/curriculum/cat-communication.jpg')",
        "cat-training-pattern": "url('/images/curriculum/cat-training.jpg')",
        "cat-beauty-pattern": "url('/images/curriculum/cat-beauty.jpg')",
      },
      colors: {
        "green-100": "#00592D",
        "green-80": "#027B3F",
        "green-60": "#4D8469",
        "green-40": "#EEF8E5",
        "green-20": "#F4FAF7",
        "green-10": "#DDECE5",
        "green-5": "#EEF9F4",
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
        H154_EB: [
          "54px",
          {
            fontWeight: 800,
            letterSpacing: "-1%",
            lineHeight: "75.6px",
          },
        ],
        H154_B: [
          "54px",
          {
            fontWeight: 700,
            letterSpacing: "-1%",
            lineHeight: "75.6px",
          },
        ],
        H240_EB: [
          "40px",
          {
            fontWeight: 800,
            letterSpacing: "-1%",
            lineHeight: "56px",
          },
        ],
        H240_B: [
          "40px",
          {
            fontWeight: 700,
            letterSpacing: "-1%",
            lineHeight: "56px",
          },
        ],
        H240_M: [
          "40px",
          {
            fontWeight: 500,
            letterSpacing: "-1%",
            lineHeight: "56px",
          },
        ],
        H336_EB: [
          "36px",
          {
            fontWeight: 800,
            letterSpacing: "-1%",
            lineHeight: "50.4px",
          },
        ],
        H336_B: [
          "36px",
          {
            fontWeight: 700,
            letterSpacing: "-1%",
            lineHeight: "50.4px",
          },
        ],
        H336_M: [
          "36px",
          {
            fontWeight: 500,
            letterSpacing: "-1%",
            lineHeight: "50.4px",
          },
        ],
        H428_EB: [
          "28px",
          {
            fontWeight: 800,
            letterSpacing: "-0%",
            lineHeight: "39.2px",
          },
        ],
        H428_B: [
          "28px",
          {
            fontWeight: 700,
            letterSpacing: "-0%",
            lineHeight: "39.2px",
          },
        ],
        H428_M: [
          "28px",
          {
            fontWeight: 500,
            letterSpacing: "-0%",
            lineHeight: "39.2px",
          },
        ],
        H524_EB: [
          "24px",
          {
            fontWeight: 800,
            letterSpacing: "-0%",
            lineHeight: "33.6px",
          },
        ],
        H524_B: [
          "24px",
          {
            fontWeight: 700,
            letterSpacing: "-0%",
            lineHeight: "33.6px",
          },
        ],
        H524_M: [
          "24px",
          {
            fontWeight: 500,
            letterSpacing: "-0%",
            lineHeight: "33.6px",
          },
        ],
        H524_R: [
          "24px",
          {
            fontWeight: 400,
            letterSpacing: "-0%",
            lineHeight: "33.6px",
          },
        ],
        H620_EB: [
          "20px",
          {
            fontWeight: 800,
            letterSpacing: "-0%",
            lineHeight: "28px",
          },
        ],
        H620_B: [
          "20px",
          {
            fontWeight: 700,
            letterSpacing: "-0%",
            lineHeight: "28px",
          },
        ],
        H620_M: [
          "20px",
          {
            fontWeight: 500,
            letterSpacing: "-0%",
            lineHeight: "28px",
          },
        ],
        H620_R: [
          "20px",
          {
            fontWeight: 400,
            letterSpacing: "-0%",
            lineHeight: "28px",
          },
        ],
        H718_EB: [
          "18px",
          {
            fontWeight: 800,
            letterSpacing: "-0%",
            lineHeight: "25.2px",
          },
        ],
        H718_B: [
          "18px",
          {
            fontWeight: 700,
            letterSpacing: "-0%",
            lineHeight: "25.2px",
          },
        ],
        H718_SB: [
          "18px",
          {
            fontWeight: 600,
            letterSpacing: "-0%",
            lineHeight: "25.2px",
          },
        ],
        H816_EB: [
          "16px",
          {
            fontWeight: 800,
            letterSpacing: "-0%",
            lineHeight: "22.4px",
          },
        ],
        H816_B: [
          "16px",
          {
            fontWeight: 700,
            letterSpacing: "-0%",
            lineHeight: "22.4px",
          },
        ],
        H816_SB: [
          "16px",
          {
            fontWeight: 600,
            letterSpacing: "-0%",
            lineHeight: "22.4px",
          },
        ],
        B118_B: [
          "18px",
          {
            fontWeight: 700,
            letterSpacing: "-0%",
            lineHeight: "28.8px",
          },
        ],
        B118_M: [
          "18px",
          {
            fontWeight: 500,
            letterSpacing: "-0%",
            lineHeight: "28.8px",
          },
        ],
        B118_R: [
          "18px",
          {
            fontWeight: 400,
            letterSpacing: "-0%",
            lineHeight: "28.8px",
          },
        ],
        B216_B: [
          "16px",
          {
            fontWeight: 700,
            letterSpacing: "-0%",
            lineHeight: "25.6px",
          },
        ],
        B216_M: [
          "16px",
          {
            fontWeight: 500,
            letterSpacing: "-0%",
            lineHeight: "25.6px",
          },
        ],
        B216_R: [
          "16px",
          {
            fontWeight: 400,
            letterSpacing: "-0%",
            lineHeight: "25.6px",
          },
        ],
        B314_B: [
          "14px",
          {
            fontWeight: 700,
            letterSpacing: "-0%",
            lineHeight: "22.4px",
          },
        ],
        B314_M: [
          "14px",
          {
            fontWeight: 500,
            letterSpacing: "-0%",
            lineHeight: "22.4px",
          },
        ],
        B314_R: [
          "14px",
          {
            fontWeight: 400,
            letterSpacing: "-0%",
            lineHeight: "22.4px",
          },
        ],
        B413_R: [
          "13px",
          {
            fontWeight: 400,
            letterSpacing: "-0%",
            lineHeight: "20.8px",
          },
        ],
        B512_B: [
          "12px",
          {
            fontWeight: 700,
            letterSpacing: "-0%",
            lineHeight: "19.2px",
          },
        ],
        B512_M: [
          "12px",
          {
            fontWeight: 500,
            letterSpacing: "-0%",
            lineHeight: "19.2px",
          },
        ],
        B512_R: [
          "12px",
          {
            fontWeight: 400,
            letterSpacing: "-0%",
            lineHeight: "19.2px",
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
