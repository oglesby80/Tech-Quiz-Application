import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Example: Listen for failed tests and log details
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    baseUrl: "http://localhost:3001", // Set your backend's base URL
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Test file pattern
    supportFile: "cypress/support/e2e.js", // Customize if needed
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}", // Component test file pattern
  },
});
