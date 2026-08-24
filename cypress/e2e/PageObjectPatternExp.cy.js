import {Login} from "../pages/Login";

const loginPage = new Login();

describe("Page object example", () => {
  it("Login Page Test", () => {
    loginPage.navigate();
    loginPage.validateLoginTitle();
    loginPage.validateInputs();
    loginPage.validateButton();
    loginPage.validatePasswordLink();
  });


});

