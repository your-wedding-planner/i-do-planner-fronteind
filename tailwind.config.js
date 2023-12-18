/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  plugins: [require("daisyui")],
  safelist: ["./src/components/Navbar.jsx"],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#EF7244",

          secondary: "E5C6BB",

          accent: "#BD6F29",

          neutral: "#FBFBFF",

          "base-100": "#ffffff",

          info: "#d0a274",

          success: "#EF7244",

          warning: "#ea580c",

          error: "#b91c1c",
        },
      },
    ],
                 // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
