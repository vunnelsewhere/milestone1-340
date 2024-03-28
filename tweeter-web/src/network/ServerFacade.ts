/**Replace all service calls to FakeData with calls to the ServerFacade */
// include a function for each API endpoint
import { ClientCommunicator } from "./ClientCommunicator";

import {
  TweeterRequest,
  TweeterResponse,
  LoginRequest,
  AuthenticateResponse,
  RegisterRequest,
  FollowRequest,
  FollowResponse,
  FollowStatusRequest,
  FollowStatusResponse,
  GetUserResponse,
  GetFollowCountRequest,
  GetFollowCountResponse,
  LoadMoreItemsRequest,
  LoadMoreItemsResponse,
  LoadMoreUsersRequest,
  LoadMoreUsersResponse,
  PostStatusRequest,
} from "tweeter-shared";

export class ServerFacade {
  private SERVER_URL =
    "https://bm2uigckx7.execute-api.us-east-2.amazonaws.com/dev";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  // Register
  async register(request: RegisterRequest): Promise<AuthenticateResponse> {
    const endpoint = "/register";
    console.log(request);
    const response: JSON =
      await this.clientCommunicator.doPost<RegisterRequest>(request, endpoint);

    return AuthenticateResponse.fromJson(response);
  }

  // Login
  async login(request: LoginRequest): Promise<AuthenticateResponse> {
    const endpoint = "/service/login";
    const response: JSON = await this.clientCommunicator.doPost<LoginRequest>(
      request,
      endpoint
    );

    return AuthenticateResponse.fromJson(response);
  }

  // Logout
  async logout(request: TweeterRequest): Promise<TweeterResponse> {
    const endpoint = "/logout";
    const response: JSON = await this.clientCommunicator.doPost<TweeterRequest>(
      request,
      endpoint
    );

    return TweeterResponse.fromJson(response);
  }

  // Follow
  async follow(request: FollowRequest): Promise<FollowResponse> {
    const endpoint = "/follow";
    const response: JSON = await this.clientCommunicator.doPost<FollowRequest>(
      request,
      endpoint
    );

    return FollowResponse.fromJson(response);
  }

  // Unfollow
  async unfollow(request: FollowRequest): Promise<FollowResponse> {
    const endpoint = "/unfollow";
    const response: JSON = await this.clientCommunicator.doPost<FollowRequest>(
      request,
      endpoint
    );

    return FollowResponse.fromJson(response);
  }

  // get Follower Status
  async getIsFollowerStatus(
    request: FollowStatusRequest
  ): Promise<FollowStatusResponse> {
    const endpoint = "/getfollowstatus";
    const response: JSON =
      await this.clientCommunicator.doPost<FollowStatusRequest>(
        request,
        endpoint
      );

    return FollowStatusResponse.fromJson(response);
  }

  // get User
  async getUser(request: TweeterRequest): Promise<GetUserResponse> {
    const endpoint = "/getuser";
    const response: JSON = await this.clientCommunicator.doPost<TweeterRequest>(
      request,
      endpoint
    );

    return GetUserResponse.fromJson(response);
  }

  // get FollowCount
  async getFollowCount(
    request: GetFollowCountRequest
  ): Promise<GetFollowCountResponse> {
    const endpoint = "/getfollowcount";
    const response: JSON =
      await this.clientCommunicator.doPost<GetFollowCountRequest>(
        request,
        endpoint
      );

    return GetFollowCountResponse.fromJson(response);
  }

  // post status
  async postStatus(request: PostStatusRequest): Promise<TweeterResponse> {
    const endpoint = "/poststatus";
    const response: JSON =
      await this.clientCommunicator.doPost<PostStatusRequest>(
        request,
        endpoint
      );

    return TweeterResponse.fromJson(response);
  }

  // load story
  async loadMoreStoryItems(
    request: LoadMoreItemsRequest
  ): Promise<LoadMoreItemsResponse> {
    const endpoint = "/loadstory";
    const repsonse: JSON =
      await this.clientCommunicator.doPost<LoadMoreItemsRequest>(
        request,
        endpoint
      );

    return LoadMoreItemsResponse.fromJson(repsonse);
  }

  // load feed
  async loadMoreFeedItems(
    request: LoadMoreItemsRequest
  ): Promise<LoadMoreItemsResponse> {
    const endpoint = "/loadfeed";
    const repsonse: JSON =
      await this.clientCommunicator.doPost<LoadMoreItemsRequest>(
        request,
        endpoint
      );

    return LoadMoreItemsResponse.fromJson(repsonse);
  }

  // load user
  async loadMoreUsers(request: LoadMoreUsersRequest) {
    const endpoint = "/loadusers";
    const response: JSON =
      await this.clientCommunicator.doPost<LoadMoreUsersRequest>(
        request,
        endpoint
      );

    return LoadMoreUsersResponse.fromJson(response);
  }
}

/**base code from Canvas */
