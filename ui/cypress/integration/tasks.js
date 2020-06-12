describe("Tasks", () => {

  Cypress.Screenshot.defaults({
    screenshotOnRunFailure: false
  });

  it ("Adds a task", () => {
    cy.server()
    cy.visit("/")
    cy.get("input").invoke("val", "Do the dishes")
    cy.get("button").click()
    cy.get("li").contains("Do the dishes")
  })

})
