/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        activeLight: "rgba(17, 205, 239, 0.1)",
        darkSidebar: "rgb(23, 43, 77)",
        activeDark: "rgba(17, 205, 239, 0.1)",
        darkBg: "rgb(5, 17, 57)",
        header: "#11CDEF",
        navMenu: "#5E72E4",
        itemColor: "#67748E",
        textColor: "#344767",
        bodyColor: "rgb(248, 249, 250)",
        drawColor: "#111C44",
        descColor: "#67748E",
        activeInput: "rgb(17, 205, 239)",
        inputColor: "rgb(52, 71, 103)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
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
      },
      backgroundImage: {
        "dark-gradient":
          "linear-gradient(310deg, rgb(33, 34, 41), rgb(33, 37, 41))",
        "violet-gradient":
          "linear-gradient(310deg, rgb(94, 114, 228), rgb(130, 94, 228))",
        "blue-gradient":
          "linear-gradient(310deg, rgb(17, 113, 239), rgb(17, 205, 239));",
        "green-gradient":
          "linear-gradient(310deg, rgb(45, 206, 137), rgb(45, 206, 204))",
        "orange-gradient":
          "linear-gradient(310deg, rgb(251, 99, 64), rgb(251, 177, 64))",
        "red-gradient":
          "linear-gradient(310deg, rgb(245, 54, 92), rgb(245, 96, 54))",
        "border-gradient":
          "linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0))",
        "login-gradient":
          "linear-gradient(310deg, rgb(17, 113, 239), rgb(17, 205, 239));",
      },
      boxShadow: {
        inputShadow:
          "rgba(17,205,239,0) 0rem 0.18975rem 0.5625rem 0rem, rgba(17,205,239,0.1) 0.1875rem 0.25rem 0.5rem 0rem",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
  ],
};
