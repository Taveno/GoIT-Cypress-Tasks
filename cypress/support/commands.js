Cypress.Commands.add('signIn', (email, password) => {
    cy.get('#user_email').type(email)

    cy.get("#user_password").type(password);

    cy.get("[type='submit']").click();
})

 Cypress.Commands.add('signOut', () => {
    cy.get('#open-navigation-menu-mobile').click();

    cy.contains('Log out').scrollIntoView().should('be.visible').click();
})