import { useEffect, useRef, useState } from "react";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoHook from "../userInfo/UserInfoHook";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  PagedItemView,
  PagedItemPresenter,
} from "../../presenter/PagedItemPresenter";

export interface ItemScrollerProps<ItemType, ServiceType> {
  presenterGenerator: (
    view: PagedItemView<ItemType>
  ) => PagedItemPresenter<ItemType, ServiceType>;
  ItemComponent: (props: { value: ItemType }) => JSX.Element;
}

export function ItemScroller<ItemType, ServiceType>(
  props: ItemScrollerProps<ItemType, ServiceType>
) {
  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<ItemType[]>([]);

  const itemsReference = useRef(items);
  itemsReference.current = items;

  const listener: PagedItemView<ItemType> = {
    addItems(newItems: ItemType[]) {
      setItems([...itemsReference.current, ...newItems]);
    },
    displayErrorMessage: displayErrorMessage,
  };
  const [presenter] = useState<PagedItemPresenter<ItemType, ServiceType>>(
    props.presenterGenerator(listener)
  );

  const { displayedUser, authToken } = useUserInfoHook();

  useEffect(() => {
    loadMoreItems();
  }, []);

  async function loadMoreItems() {
    presenter.loadMoreItems(authToken!, displayedUser!);
  }

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={presenter.hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          <props.ItemComponent value={item} key={index} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
