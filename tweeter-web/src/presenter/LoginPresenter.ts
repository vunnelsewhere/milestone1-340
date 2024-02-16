import { User, AuthToken } from "tweeter-shared";
import { LoginService } from "../model/service/LoginService";

export interface LoginView {
  // content based on errors from doLogin()
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
  displayErrorMessage: (
    message: string,
    bootstrapClasses?: string | undefined
  ) => void;
  navigate: (url: string) => void; // ** what it returns
}

export class LoginPresenter {
  private service: LoginService;
  private view: LoginView;

  public constructor(view: LoginView) {
    this.service = new LoginService();
    this.view = view;
  }

  // copy from login.tsx
  // await login (login service)
  public async doLogin(
    originalUrl: string | undefined,
    alias: string,
    password: string,
    rememberMeRef: boolean
  ) {
    // public async doLogin()  {
    try {
      let [user, authToken] = await this.service.login(alias, password);

      this.view.updateUserInfo(user, user, authToken, rememberMeRef);

      if (!!originalUrl) {
        this.view.navigate(originalUrl);
      } else {
        this.view.navigate("/");
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user in because of exception: ${error}`
      );
    }
  }
}

// create View and Presenter
// create constructor and loginservice (this.service.)
// create view
