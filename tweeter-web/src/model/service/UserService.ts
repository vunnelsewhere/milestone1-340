// Condense all user-related services into one class
// Register, Login, UserInfo, UserNavigation

import {
  AuthToken,
  FakeData,
  FollowRequest,
  FollowStatusRequest,
  GetFollowCountRequest,
  LoginRequest,
  RegisterRequest,
  TweeterRequest,
  User,
} from "tweeter-shared";

import { Buffer } from "buffer";
import { ServerFacade } from "../../network/ServerFacade";
export class UserService {
  /* Register */
  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array
  ): Promise<[User, AuthToken]> {
    // Not neded now, but will be needed when you make the request to the server in milestone 3
    const server = new ServerFacade();

    let imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    // TODO: Replace with the result of calling the server
    // let user = FakeData.instance.firstUser;
    const resp = await server.register(
      new RegisterRequest(
        firstName,
        lastName,
        alias,
        password,
        imageStringBase64
      )
    );
    const user = resp.user;
    const token = resp.token;

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return [user, token]; // return [user, FakeData.instance.authToken];
  }

  /* Login */
  public async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    // TODO: Replace with the result of calling the server
    // let user = FakeData.instance.firstUser;
    const server = new ServerFacade();
    const resp = await server.login(new LoginRequest(alias, password));
    let user = resp.user;
    let token = resp.token;

    if (user === null) {
      throw new Error("Invalid alias or password");
    }

    return [user, token]; // return [user, FakeData.instance.authToken];
  }

  public async logout(authToken: AuthToken) {
    // TODO: Replace with the result of calling the server
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    // await new Promise((res) => setTimeout(res, 1000));
    const server = new ServerFacade();
    await server.logout(new TweeterRequest("", authToken));
  }

  /* UserInfo */
  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    // TODO: Replace with the result of calling server
    const server = new ServerFacade();
    const response = await server.getIsFollowerStatus(
      new FollowStatusRequest("", authToken, user, selectedUser)
    );
    return response.followStatus;
    // return FakeData.instance.isFollower();
  }

  public async getFolloweesCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    // TODO: Replace with the result of calling server
    const server = new ServerFacade();
    const response = await server.getFollowCount(
      new GetFollowCountRequest("", authToken, user, "followees")
    );
    return response.count;
    // return FakeData.instance.getFolloweesCount(user);
  }

  public async getFollowersCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    // TODO: Replace with the result of calling server
    const server = new ServerFacade();
    const response = await server.getFollowCount(
      new GetFollowCountRequest("", authToken, user, "followers")
    );
    return response.count;
    // return FakeData.instance.getFollowersCount(user);
  }

  public async follow(
    authToken: AuthToken,
    userToFollow: User
  ): Promise<[followersCount: number, followeesCount: number]> {
    // Pause so we can see the following message. Remove when connected to the server
    // await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server
    const server = new ServerFacade();
    const resp = await server.follow(
      new FollowRequest("", authToken, userToFollow)
    );

    /*
    let followersCount = await this.getFollowersCount(authToken, userToFollow);
    let followeesCount = await this.getFolloweesCount(authToken, userToFollow);
    */
    const followersCount = resp.followersCount;
    const followeesCount = resp.followeesCount;

    return [followersCount, followeesCount];
  }

  public async unfollow(
    authToken: AuthToken,
    userToUnfollow: User
  ): Promise<[followersCount: number, followeesCount: number]> {
    // Pause so we can see the unfollowing message. Remove when connected to the server
    // await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server
    const server = new ServerFacade();
    const resp = await server.unfollow(
      new FollowRequest("", authToken, userToUnfollow)
    );

    /*
    let followersCount = await this.getFollowersCount(
      authToken,
      userToUnfollow
    );
    let followeesCount = await this.getFolloweesCount(
      authToken,
      userToUnfollow
    );
    */
    const followersCount = resp.followersCount;
    const followeesCount = resp.followeesCount;

    return [followersCount, followeesCount];
  }

  /* UserNavigation */
  public async getUser(
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    // TODO: Replace with the result of calling server
    const server = new ServerFacade();
    const response = await server.getUser(new TweeterRequest(alias, authToken));
    return response.user;
    // return FakeData.instance.findUserByAlias(alias);
  }
}
