import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";

export const USER_ITEM_PAGE_SIZE = 10;

export interface UserItemView {
  addItems: (items: User[]) => void;
  displayErrorMessage: (message: string) => void;
}

// parent class of presenter for following and followee
export abstract class UserItemPresenter {
  private _view: UserItemView;

  private _hasMoreItems: boolean = true;
  protected service: FollowService;

  protected constructor(view: UserItemView) {
    this._view = view;
    this.service = new FollowService();
  }

  // access from subclass
  protected get view(): UserItemView {
    return this._view;
  }

  protected set hasMoreItems(value: boolean) {
    this._hasMoreItems = value;
  }

  // getter to access in component, not just subclass
  public get hasMoreItems(): boolean {
    return this._hasMoreItems;
  }

  // so it knows it has this method to call; abstract method can't be async
  public abstract loadMoreItems(
    authToken: AuthToken,
    displayedUser: User
  ): void;
}
