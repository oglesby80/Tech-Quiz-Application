describe("Quiz Component", () => {
  beforeEach(() => {
    // Set up the intercept
    cy.intercept("GET", "/api/questions", (req) => {
      console.log("Intercepted request:", req);
      req.reply({
        statusCode: 200,
        body: [
          {
            id: 1,
            question: "What is 2 + 2?",
            answers: [
              { text: "3", isCorrect: false },
              { text: "4", isCorrect: true },
            ],
          },
          {
            id: 2,
            question: "What is 3 + 5?",
            answers: [
              { text: "7", isCorrect: false },
              { text: "8", isCorrect: true },
            ],
          },
        ],
      });
    }).as("getQuestions");

    cy.visit("/"); // Visit the application
  });

  it("starts the quiz and completes it", () => {
    cy.log("Waiting for API response");
    cy.wait("@getQuestions").then((interception) => {
      console.log("Intercepted response:", interception.response);
      expect(interception.response?.body).to.have.length(2);
    });

    cy.log("Clicking Start Quiz");
    cy.get("[data-cy=start-quiz]").should("exist").click();

    cy.log("Verifying first question");
    cy.get("[data-cy=quiz-question]").should("contain.text", "What is 2 + 2?");

    cy.log("Selecting the correct answer for Question 1");
    cy.get("[data-cy=answer-button]").eq(1).click(); // Select "4"

    cy.log("Verifying second question");
    cy.get("[data-cy=quiz-question]").should("contain.text", "What is 3 + 5?");

    cy.log("Selecting the correct answer for Question 2");
    cy.get("[data-cy=answer-button]").eq(1).click(); // Select "8"

    cy.log("Verifying quiz completion screen");
    cy.get("[data-cy=final-score]").should("contain.text", "Your score: 2/2");

    cy.log("Restarting the quiz");
    cy.get("[data-cy=restart-quiz]").click();

    cy.log("Verifying quiz restart");
    cy.get("[data-cy=start-quiz]").should("exist");
  });
});






