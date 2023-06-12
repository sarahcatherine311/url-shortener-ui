describe('User Flows spec', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 200,
      fixture: "./urls.json"
    })
    .visit("http://localhost:3000/")
  })
  
  it('When a user visits the page, they can view the page title and the existing shortened URLs', () => {
    cy.get('.title').should("be.visible").contains("URL Shortener")
    .get(".url").should("be.visible").should("have.length", 1)
    .get(".short-url").should("be.visible")
  })

  it('When a user visits the page, they can view the Form with the proper inputs', () => {
    cy.get("form").should("be.visible")
    .get(".title-input").should("have.value", "")
    .get(".url-input").should("have.value", "")
  })
  
  it('When a user fills out the form, the information is reflected in the input fields', () => {
    cy.get("form").should("be.visible")
    .get(".title-input").type("New Title!").should("have.value", "New Title!")
    .get(".url-input").type("URL to shorten!").should("have.value", "URL to shorten!")
  })
  
  it('When a user fills out and submits the form, the new shortened URL is rendered', () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      statusCode: 201,
      body: {
        title: "New Title!",
        long_url: "URL to shorten!",
        short_url: "shortURL.com"
      }
    })
    .get("form").should("be.visible")
    .get(".title-input").type("New Title!").should("have.value", "New Title!")
    .get(".url-input").type("URL to shorten!").should("have.value", "URL to shorten!")
    .get(".submit-button").click()
    .get(".url").should("have.length", 2)
    .get(".short-url").last().should("be.visible").contains("shortURL.com")
  })
})