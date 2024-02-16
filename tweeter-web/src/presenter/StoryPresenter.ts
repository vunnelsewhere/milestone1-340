import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { PAGE_SIZE } from "./FollowingPresenter";
import { StatusItemPresenter, StatusItemView } from "./StatusItemPresenter";

export class StoryPresenter extends StatusItemPresenter {
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
        let [newItems, hasMore] = await this.service.loadMoreStoryItems(
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
        `Failed to load story items because of exception: ${error}`
      );
    }
  }
}

/**
 * Step 3: copy the loadmoreitems function here from statusitemscroller
 * Step 4: initizte the service, add that in constructor
 * Step 6: lastItem, this. fix, story error message
 * Step 9? fix this file, go to app.tsx, delete feed and story 
 */
