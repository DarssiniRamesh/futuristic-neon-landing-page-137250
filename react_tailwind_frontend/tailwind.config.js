/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        surface: "#1F2937",
        primary: "#10B981",
        secondary: "#F59E0B",
        error: "#EF4444",
        text: "#FFFFFF"
      },
      fontFamily: {
        display: ['"Orbitron"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"]
      },
      boxShadow: {
        neon: "0 0 10px rgba(16,185,129,0.7), 0 0 20px rgba(16,185,129,0.4)",
        "neon-sm": "0 0 6px rgba(16,185,129,0.6)"
      },
      backgroundImage: {
        'grid-glow': "radial-gradient(circle at 1px 1px, rgba(16,185,129,0.15) 1px, transparent 0)",
      }
    }
  },
  plugins: []
};
