import {Login} from "../pages/Login";
import {homePage} from "../pages/HomePage";

const loginPage = new Login();
const _homePage = new homePage();

describe("login test", () => {
  it("Login and Logout", () => {
    loginPage.navigate();

    loginPage.signIn("user888@gmail.com", "1234567890");

    _homePage.signOut();


  }); 
  it("Login with others", () => {
    loginPage.navigate();

    loginPage.signIn("testowyqa@qa.team", "QA!automation-1");

    _homePage.signOut();

  })

    


});
