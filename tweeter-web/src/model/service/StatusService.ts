import {
  AuthToken,
  User,
  Status,
  FakeData,
  PostStatusRequest,
  TweeterResponse,
  LoadMoreItemsResponse,
  LoadMoreItemsRequest,
} from "tweeter-shared";
import { ServerFacade } from "../../network/ServerFacade";

export class StatusService {
  public async loadMoreStoryItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    // TODO: Replace with the result of calling server
    const server = new ServerFacade();
    const response: LoadMoreItemsResponse = await server.loadMoreStoryItems(
      new LoadMoreItemsRequest("", authToken, user, lastItem, pageSize)
    );
    const itemsList = response.itemsList;
    const hasMoreItems = response.hasMoreItems;
    return [itemsList, hasMoreItems];

    //return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  }

  public async loadMoreFeedItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    // TODO: Replace with the result of calling server
    const server = new ServerFacade();
    const response: LoadMoreItemsResponse = await server.loadMoreFeedItems(
      new LoadMoreItemsRequest("", authToken, user, lastItem, pageSize)
    );
    const itemsList = response.itemsList;
    const hasMoreItems = response.hasMoreItems;
    return [itemsList, hasMoreItems];
    // return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  }

  public async postStatus(
    authToken: AuthToken,
    newStatus: Status
  ): Promise<void> {
    // Pause so we can see the logging out message. Remove when connected to the server
    //await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server to post the status
    const server = new ServerFacade();
    const response: TweeterResponse = await server.postStatus(
      new PostStatusRequest("", authToken, newStatus)
    );
    console.log(response.success);
  }
}

/**
 * Step 1: copy the feed, story function from app.tsx and import fix, public async, no arrow function
 */
