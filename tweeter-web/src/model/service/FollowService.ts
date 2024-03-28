import {
  AuthToken,
  User,
  FakeData,
  LoadMoreUsersResponse,
  LoadMoreUsersRequest,
} from "tweeter-shared";
import { ServerFacade } from "../../network/ServerFacade";

export class FollowService {
  public async loadMoreFollowers(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    // TODO: Replace with the result of calling server
    const server = new ServerFacade();
    const response: LoadMoreUsersResponse = await server.loadMoreUsers(
      new LoadMoreUsersRequest(
        "",
        authToken,
        user,
        lastItem,
        pageSize,
        "followers"
      )
    );

    const userList = response.itemsList;
    const hasMoreItems = response.hasMoreItems;
    return [userList, hasMoreItems];

    // return FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
  }

  public async loadMoreFollowees(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    // TODO: Replace with the result of calling server
    const server = new ServerFacade();
    const response: LoadMoreUsersResponse = await server.loadMoreUsers(
      new LoadMoreUsersRequest(
        "",
        authToken,
        user,
        lastItem,
        pageSize,
        "followees"
      )
    );
    const userList = response.itemsList;
    const hasMoreItems = response.hasMoreItems;

    return [userList, hasMoreItems];

    // return FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
  }
}

/*
 * 17:38 arrow functions aren't applicable to classes
 */
