import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { UserItemPresenter, UserItemView } from "./UserItemPresenter";

export const PAGE_SIZE = 10;

export class FollowingPresenter extends UserItemPresenter {
  private lastItem: User | null = null;

  public constructor(view: UserItemView) {
    super(view); // revise this
  }

  public async loadMoreItems(authToken: AuthToken, user: User) {
    try {
      if (this.hasMoreItems) {
        let [newItems, hasMore] = await this.service.loadMoreFollowees(
          authToken,
          user,
          PAGE_SIZE,
          this.lastItem
        );

        this.hasMoreItems = hasMore;
        this.lastItem = newItems[newItems.length - 1];
        this.view.addItems(newItems);
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to load followee because of exception: ${error}`
      );
    }
  }
}

/* arrow functions aren't applicable to classes */
/* 20:52 not going to pass props into presenter; we use props to pass things across components; we don't do that with classes
 * we pass in those as parameters instead
 */

/** 22:05 use state is for react components, we are no longer in there */
/* 24:59 some code comes from the hook, cannot just copy; those are the things being passed into the components, not created by the component ; set those as parameters*/

/*
        let [newItems, hasMore] = await props.loadItems(
          authToken!,
          displayedUser!,
          PAGE_SIZE,
          this.lastItem
        );
        */
