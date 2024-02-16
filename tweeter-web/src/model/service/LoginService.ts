import { User, AuthToken, FakeData } from "tweeter-shared";

// this service class is to refactor Login.tsx
export class LoginService {
  public async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    // TODO: Replace with the result of calling the server
    let user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid alias or password");
    }

    return [user, FakeData.instance.authToken];
  }
}

// copy from login.tsx