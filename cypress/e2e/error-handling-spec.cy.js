describe('Error Handling spec', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 200,
      fixture: "./urls.json"
    })
  })

  it('should give an error message when the fetch fails', () => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 500,
    })
    .visit("http://localhost:3000/")
    .get(".error").should("be.visible").contains("Error fetching URLs")
  })
  
  it('should give an error message when the post fails', () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      statusCode: 500,
    })
    .visit("http://localhost:3000/")
    .get(".title-input").type("New Title!").should("have.value", "New Title!")
    .get(".url-input").type("URL to shorten!").should("have.value", "URL to shorten!")
    .get(".submit-button").click()
    .get(".error").should("be.visible").contains("Error posting URL")
  })

  it('should give an error message when the inputs are not both filled out on submit', () => {
    cy.visit("http://localhost:3000/")
    .get(".title-input").type("New Title!").should("have.value", "New Title!")
    .get(".submit-button").click()
    .get(".error").should("be.visible")
  })
})