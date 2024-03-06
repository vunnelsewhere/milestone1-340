import { AuthToken, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export interface PagedItemView<ItemType> extends View {
  addItems: (newItems: ItemType[]) => void;
}

export abstract class PagedItemPresenter<ItemType, ServiceType> extends Presenter {
  protected service: ServiceType;
  private _hasMoreItems: boolean = true;
  private _lastItem: ItemType | null = null;
  private intent: string;

  public constructor(view: PagedItemView<ItemType>, intent: string) { // this is public
    super(view);
    this.service = this.createService();
    this.intent = intent;
  }

  public set hasMoreItems(value: boolean) {
    this._hasMoreItems = value;
  }

  public get hasMoreItems(): boolean {
    return this._hasMoreItems;
  }

  protected set lastItem(value: ItemType | null) {
    this._lastItem = value;
  }

  protected get lastItem(): ItemType | null {
    return this._lastItem;
  }

  protected abstract createService(): ServiceType;

  public addItems(newItems: ItemType[]): void {
    this.view.addItems(newItems);
  }

  protected get view(): PagedItemView<ItemType> {
    return super.view as PagedItemView<ItemType>;
  }

  public async loadMoreItems(authToken: AuthToken, displayedUser: User): Promise<void> {
    this.doFailureReportingOperation(async () => {
      if (!this.hasMoreItems) {
        return;
      }
      let [newItems, hasMore] = await this.getMoreItems(authToken, displayedUser);

      this.hasMoreItems = hasMore;
      this.lastItem = newItems[newItems.length - 1];
      this.view.addItems(newItems);
    }, this.intent);
  }

  public abstract getMoreItems(
    authToken: AuthToken,
    user: User
  ): Promise<[newItems: ItemType[], hasMore: boolean]>;
}