import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Ensure this matches your app's dev server URL
    setupNodeEvents(on, config) {
      // Add custom Node event listeners or plugins here
      on("task", {
        // Example: Log messages to the console
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Path for E2E test files
    fixturesFolder: "cypress/fixtures", // Folder for mock data
    supportFile: "cypress/support/e2e.js", // Add global commands or setup
    video: true, // Enable video recording for E2E tests
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite", // Use Vite for fast builds
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}", // Path for component test files
    supportFile: "cypress/support/component.js", // Add global commands for component tests
  },
});
