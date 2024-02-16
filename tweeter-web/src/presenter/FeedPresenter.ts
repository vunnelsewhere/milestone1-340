import { Status, AuthToken, User } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { PAGE_SIZE } from "./FollowingPresenter";
import { StatusItemPresenter, StatusItemView } from "./StatusItemPresenter";

export class FeedPresenter extends StatusItemPresenter {
  private service: StatusService;

  private lastItem: Status | null = null;

  public constructor(view: StatusItemView) {
    // Constructors for derived classes must contain a 'super' call.
    super(view);
    this.service = new StatusService();
  }

  public async loadMoreItems(authToken: AuthToken, displayedUser: User) {
    try {
      if (this.hasMoreItems) {
        let [newItems, hasMore] = await this.service.loadMoreFeedItems(
          // first change from story
          authToken!,
          displayedUser!,
          PAGE_SIZE,
          this.lastItem
        );

        this.hasMoreItems = hasMore;
        this.lastItem = newItems[newItems.length - 1];
        this.view.addItems(newItems);
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to load feed items because of exception: ${error}` // second change
      );
    }
  }
}

/**
 * Step 3: copy the loadmoreitems function here
 * Step 7: this, copy from story presenter, fix to fit feed
 */
