describe('Delete spec', () => {
    beforeEach(() => {
      cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
        statusCode: 200,
        fixture: "./urls.json"
      })
      cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
        statusCode: 201,
        body: {
          id: 2,
          title: "New Title!",
          long_url: "URL to shorten!",
          short_url: "shortURL.com"
        }
      })
      cy.intercept("DELETE", "http://localhost:3001/api/v1/urls/2", {
      })
      .visit("http://localhost:3000/")
    })
  it('should be able to delete urls', () => {
    cy.get(".title-input").type("New Title!")
    .get(".url-input").type("URL to shorten!")
    .get(".submit-button").click()
    .get(".url").should("have.length", 2)
    .get(".delete-button").last().click()
    .get(".url").should("have.length", 1)
  })
})