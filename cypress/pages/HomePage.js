export class homePage{
    signOut() {
        cy.get('#open-navigation-menu-mobile').click();

        cy.contains('Log out').scrollIntoView().should('be.visible').click();
    }
}