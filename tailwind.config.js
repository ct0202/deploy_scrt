/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,tsx}", 
    "./src/components/**/*.{html,js,jsx,tsx}" // Исправленный путь
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        syne: ['"Syne"', 'sans-serif'],  
        raleway: ["Raleway", "Helvetica", "sans-serif"],
        
      },
      colors: {
        primary: "#297bff", // Добавляем кастомный цвет с именем "primary"
        gray: '#2a2a2ab2',
        middleGray: 'rgba(235, 235, 245, 0.3)',
        lightGray: "#fff"
      },
      backgroundColor: {
        primary: "#1c1c1e", // Добавляем кастомный цвет с именем "primary"
        mint: "rgba(161, 246, 158, 1)"
      },
      backgroundImage: {
        buttonGradient: "linear-gradient(123deg, #6aa3ff 0%, #3180ff 100%)",
      },
      boxShadow: {
        custom: "0 2px 6px 0 rgba(178, 178, 178, 0.2)", // Ваше значение
      },
      extend: {
        colors: {
            mint: "var(--mint)",
            textbutton: "var(--textbutton)",
            textmain: "var(--textmain)",
        },
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-100%)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-100%)' },
        }
      },
      animation: {
        slideDown: 'slideDown 1s ease-in-out',
        slideUp: 'slideUp 1s ease-in-out',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */

