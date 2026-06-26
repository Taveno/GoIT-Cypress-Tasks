export class Login {
    navigate() {
        cy.visit("https://www.edu.goit.global/account/login");
    }

    signIn(email, password) {
    cy.get('#user_email').type(email)

    cy.get("#user_password").type(password);

    cy.get("[type='submit']").click();
}


    validateLoginTitle() {
        cy.get('.next-10stgr7 > .next-c1vj7d').should("be.visible");
        cy.get('.next-10stgr7 > .next-c1vj7d').should("have.text", "Login");
    }

    validateInputs() {
    cy.get("#user_email").should("be.visible");
    cy.get("#user_password").should("be.visible");
    }

    validateButton() {
    cy.get(".eckniwg2").should("be.visible");
    }

    validatePasswordLink() {
    cy.get('.next-1v2ri13 > .next-mtc523').should("be.visible");
    cy.get('.next-1v2ri13 > .next-mtc523').should("have.text", "I can't remember the password");
    } 
}