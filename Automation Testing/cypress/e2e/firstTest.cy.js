describe("login test", () => {
  it("Login and Logout", () => {
    cy.visit("https://www.edu.goit.global/account/login");

    cy.signIn("user888@gmail.com", "1234567890");

    cy.signOut();
    
    
  }); 
  it("Login with others", () => {
    cy.visit("https://www.edu.goit.global/account/login");  

    cy.signIn("testowyqa@qa.team", "QA!automation-1");

    cy.signOut();

  })

    


});

