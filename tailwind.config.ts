import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        poll: {
          teacher: "hsl(214, 100%, 59%)", // Blue for teacher
          student: "hsl(142, 76%, 36%)", // Green for student
          active: "hsl(45, 100%, 51%)", // Yellow for active polls
          completed: "hsl(220, 13%, 91%)", // Gray for completed
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addBase }) {
      addBase({
        ":root": {
          "--background": "0 0% 95%", // #F2F2F2
          "--foreground": "0 0% 22%", // #373737
          "--card": "0 0% 95%", // #F2F2F2
          "--card-foreground": "0 0% 22%", // #373737
          "--popover": "0 0% 95%", // #F2F2F2
          "--popover-foreground": "0 0% 22%", // #373737
          "--primary": "260 88% 43%", // #4F0DCE
          "--primary-foreground": "0 0% 100%", // White for contrast
          "--secondary": "232 56% 58%", // #5767D0
          "--secondary-foreground": "0 0% 100%", // White for contrast
          "--muted": "0 0% 43%", // #6E6E6E
          "--muted-foreground": "0 0% 95%", // #F2F2F2
          "--accent": "249 60% 63%", // #7765DA
          "--accent-foreground": "0 0% 100%", // White for contrast
          "--destructive": "0 84.2% 60.2%", // Keep default destructive
          "--destructive-foreground": "210 40% 98%",
          "--border": "0 0% 43%", // #6E6E6E
          "--input": "0 0% 43%", // #6E6E6E
          "--ring": "260 88% 43%", // #4F0DCE
          "--radius": "0.5rem",
          "--sidebar-background": "0 0% 98%",
          "--sidebar-foreground": "240 5.3% 26.1%",
          "--sidebar-primary": "240 5.9% 10%",
          "--sidebar-primary-foreground": "0 0% 98%",
          "--sidebar-accent": "240 4.8% 95.9%",
          "--sidebar-accent-foreground": "240 5.9% 10%",
          "--sidebar-border": "220 13% 91%",
          "--sidebar-ring": "217.2 91.2% 59.8%",
        },
        ".dark": {
          "--background": "0 0% 22%", // #373737
          "--foreground": "0 0% 95%", // #F2F2F2
          "--card": "0 0% 22%", // #373737
          "--card-foreground": "0 0% 95%", // #F2F2F2
          "--popover": "0 0% 22%", // #373737
          "--popover-foreground": "0 0% 95%", // #F2F2F2
          "--primary": "260 88% 43%", // #4F0DCE
          "--primary-foreground": "0 0% 100%",
          "--secondary": "232 56% 58%", // #5767D0
          "--secondary-foreground": "0 0% 100%",
          "--muted": "0 0% 43%", // #6E6E6E
          "--muted-foreground": "0 0% 95%",
          "--accent": "249 60% 63%", // #7765DA
          "--accent-foreground": "0 0% 100%",
          "--destructive": "0 62.8% 30.6%",
          "--destructive-foreground": "210 40% 98%",
          "--border": "0 0% 43%", // #6E6E6E
          "--input": "0 0% 43%", // #6E6E6E
          "--ring": "260 88% 43%", // #4F0DCE
          "--sidebar-background": "240 5.9% 10%",
          "--sidebar-foreground": "240 4.8% 95.9%",
          "--sidebar-primary": "224.3 76.3% 48%",
          "--sidebar-primary-foreground": "0 0% 100%",
          "--sidebar-accent": "240 3.7% 15.9%",
          "--sidebar-accent-foreground": "240 4.8% 95.9%",
          "--sidebar-border": "240 3.7% 15.9%",
          "--sidebar-ring": "217.2 91.2% 59.8%",
        },
      });
    }),
  ],
} satisfies Config;