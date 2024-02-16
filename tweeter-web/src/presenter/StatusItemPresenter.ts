import { Status, AuthToken, User } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";

export interface StatusItemView {
  addItems: (items: Status[]) => void;
  displayErrorMessage: (message: string) => void;
}

// parent class of presenter for following and followee
export abstract class StatusItemPresenter {
  private _view: StatusItemView;

  private _hasMoreItems: boolean = true;
  // protected service: StatusService; // revise this // Property 'service' is private in type 'StoryPresenter' but not in type 'StatusItemPresenter'.

  protected constructor(view: StatusItemView) {
    this._view = view;
    // this.service = new StatusService();
  }

  protected get view() {
    return this._view;
  }

  public abstract loadMoreItems(
    authToken: AuthToken,
    displayedUser: User
  ): void;

  public get hasMoreItems() {
    return this._hasMoreItems;
  }

  public set hasMoreItems(value: boolean) {
    this._hasMoreItems = value;
  }
}

/**
 * Step 2 create this base class
 * Step 5: fix this base class
 */
