import { AuthToken, User, Status, FakeData } from "tweeter-shared";

export class StatusService {
  public async loadMoreStoryItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  }

  public async loadMoreFeedItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  }
}

/**
 * Step 1: copy the feed, story function from app.tsx and import fix, public async, no arrow function
 */
