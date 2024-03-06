// referenced in package.json; allows to run files ends with .test

import {
  anything,
  capture,
  instance,
  mock,
  spy,
  verify,
  when,
} from "ts-mockito";
import {
  AppNavbarPresenter,
  AppNavbarView,
} from "../../../src/presenter/authentication/AppNavbarPresenter";
import { AuthToken } from "tweeter-shared";
import { LoginService } from "../../../src/model/service/LoginService";

describe("LogoutPresenter", () => {
  // variable declarations
  let mockAppNavbarView: AppNavbarView;
  let appNavbarPresenter: AppNavbarPresenter;
  let mockLoginService: LoginService;

  const authToken = new AuthToken("token", Date.now());

  // settings prior to test calls
  beforeEach(() => {
    mockAppNavbarView = mock<AppNavbarView>();
    const mockAppNavbarViewInstance = instance(mockAppNavbarView);

    const appNavbarPresenterSpy = spy(
      new AppNavbarPresenter(mockAppNavbarViewInstance)
    );
    appNavbarPresenter = instance(appNavbarPresenterSpy);

    mockLoginService = mock<LoginService>();
    const mockLoginServiceInstance = instance(mockLoginService);

    when(appNavbarPresenterSpy.service).thenReturn(mockLoginServiceInstance);
  });

  //1. The presenter tells the view to display a logging out message
  it("tells the view to display a logging out message", async () => {
    await appNavbarPresenter.logOut(authToken);
    verify(mockAppNavbarView.displayInfoMessage("Logging Out...", 0)).once();
  });

  // 2. The presenter calls logout on the user service with the correct auth token.
  it("calls logout on the user service with the correct auth token", async () => {
    await appNavbarPresenter.logOut(authToken);
    verify(mockLoginService.logout(authToken)).once();
  });

  it("tells the view to clear the last info message, clear user info, navigate to the login page when logout succeeds", async () => {
    await appNavbarPresenter.logOut(authToken);

    verify(mockAppNavbarView.clearLastInfoMessage()).once();
    verify(mockAppNavbarView.clearUserInfo()).once();
    verify(mockAppNavbarView.navigateToLogin()).once();

    verify(mockAppNavbarView.displayErrorMessage(anything())).never();
  });

  // 4. When the logout is not successful, the presenter tells the view to display an error message and does not tell it to do the following: clear the last info message, clear the user info, and navigate to the login page.
  it("tells the view to display an error message and does not clear the last info message, clear user info, navigate to the login page when logout fails", async () => {
    const error = new Error("An error occurred");
    when(mockLoginService.logout(authToken)).thenThrow(error);

    await appNavbarPresenter.logOut(authToken);

    verify(
      mockAppNavbarView.displayErrorMessage(
        "Failed to log user out because of exception: An error occurred"
      )
    ).once();

    verify(mockAppNavbarView.clearLastInfoMessage()).never();
    verify(mockAppNavbarView.clearUserInfo()).never();
    verify(mockAppNavbarView.navigateToLogin()).never();
  });
});
