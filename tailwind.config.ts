/** @type {import('tailwindcss').Config} */
module.exports = {
    // Enable dark mode support using CSS classes
    darkMode: ["class"],
    
    // Define which files Tailwind should scan for classes
    // This is crucial for performance - only scan your source files, not node_modules
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",        // Pages in src directory
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",   // Components in src directory
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",          // App router files
      "./components/**/*.{js,ts,jsx,tsx,mdx}",       // Components in root
      "./app/**/*.{js,ts,jsx,tsx,mdx}",              // App router files in root
      "./lib/**/*.{js,ts,jsx,tsx,mdx}",              // Utility libraries
      "./hooks/**/*.{js,ts,jsx,tsx,mdx}",            // Custom hooks
    ],
    
    // Theme configuration
    theme: {
      // Container settings for consistent max-widths and padding
      container: {
        center: true,                    // Center containers horizontally
        padding: "2rem",                 // Add padding around containers
        screens: {
          "2xl": "1400px",               // Max width for extra large screens
        },
      },
      
      // Extend the default theme with custom values
      extend: {
        // Custom breakpoints for responsive design
        screens: {
          mobile: "375px",               // Mobile breakpoint
          tablet: "768px",               // Tablet breakpoint
          desktop: "1280px",             // Desktop breakpoint
        },
        
        // Color palette using CSS custom properties for theming
        colors: {
          // Base colors using HSL values for easy theming
          border: "hsl(var(--border))",                    // Border color
          input: "hsl(var(--input))",                      // Input field color
          ring: "hsl(var(--ring))",                        // Focus ring color
          background: "hsl(var(--background))",            // Background color
          foreground: "hsl(var(--foreground))",            // Text color
          
          // Primary color palette (red theme)
          primary: {
            DEFAULT: "hsl(var(--primary))",                // Default primary color
            foreground: "hsl(var(--primary-foreground))",  // Text on primary background
            50: "#fef2f2",                                 // Lightest shade
            100: "#fee2e2",                                // Very light shade
            200: "#fecaca",                                // Light shade
            300: "#fca5a5",                                // Medium light shade
            400: "#f87171",                                // Medium shade
            500: "#ef4444",                                // Base shade
            600: "#dc2626",                                // Medium dark shade
            700: "#b91c1c",                                // Dark shade
            800: "#991b1b",                                // Very dark shade
            900: "#7f1d1d",                                // Darkest shade
          },
          
          // Secondary colors for UI elements
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          
          // Destructive colors for errors/warnings
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          
          // Muted colors for subtle text
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          
          // Accent colors for highlights
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          
          // Popover colors for dropdowns/modals
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          
          // Card colors for card components
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        
        // Border radius values using CSS custom properties
        borderRadius: {
          lg: "var(--radius)",                    // Large border radius
          md: "calc(var(--radius) - 2px)",        // Medium border radius
          sm: "calc(var(--radius) - 4px)",        // Small border radius
        },
        
        // Custom animations
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",    // Accordion open animation
          "accordion-up": "accordion-up 0.2s ease-out",        // Accordion close animation
          spin: "spin 1s linear infinite",                     // Spinning animation
          "fade-in": "fadeIn 0.2s ease-in-out",               // Fade in animation
        },
        
        // Keyframes for custom animations
        keyframes: {
          // Accordion animations for smooth height transitions
          "accordion-down": {
            from: { height: "0" },                            // Start with no height
            to: { height: "var(--radix-accordion-content-height)" }, // End with content height
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" }, // Start with content height
            to: { height: "0" },                              // End with no height
          },
          // Custom fade in animation
          fadeIn: {
            "0%": { opacity: "0" },                           // Start fully transparent
            "100%": { opacity: "1" },                         // End fully opaque
          },
        },
      },
    },
    
    // Plugins for additional functionality
    plugins: [require("tailwindcss-animate")], // Add animation utilities
  }