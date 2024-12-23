import { mount } from "cypress/react18";
import Quiz from "../../src/components/Quiz";

describe("Quiz Component", () => {
  it("renders the quiz component", () => {
    mount(<Quiz />);
    cy.get("[data-cy=quiz-question]").should("exist");
  });

  it("handles answer selection and displays the score", () => {
    mount(<Quiz />);
    cy.get("[data-cy=answer-button]").first().click();
    cy.get("[data-cy=submit-button]").click();
    cy.get("[data-cy=final-score]").should("exist");
  });
});
