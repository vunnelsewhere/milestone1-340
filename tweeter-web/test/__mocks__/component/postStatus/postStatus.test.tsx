import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { anything, capture, instance, mock, verify, when } from "ts-mockito";

import PostStatus from "../../../../src/components/postStatus/PostStatus";
import {
  PostStatusPresenter,
  PostStatusView,
} from "../../../../src/presenter/status/PostStatusPresenter";
import useUserInfo from "../../../../src/components/userInfo/UserInfoHook";
import { AuthToken, User } from "tweeter-shared";

// use Jest to create a mock of the hook
jest.mock("../../../../src/components/userInfo/UserInfoHook", () => ({
  // Cannot find module
  ...jest.requireActual("../../../../src/components/userInfo/UserInfoHook"),
  __esModule: true,
  default: jest.fn(),
}));

describe("Post Status", () => {
  const mockUserInstance = new User("first", "last", "alias", "image_url");
  const mockAuthTokenInstance = new AuthToken("token", 1);

  beforeAll(() => {
    // specify the values the hook returns like this:
    (useUserInfo as jest.Mock).mockReturnValue({
      currentUser: mockUserInstance,
      authToken: mockAuthTokenInstance,
    });
  });

  // 1. When first rendered the Post Status and Clear buttons are both disabled.
  it("disables post status and clear buttons on first render", () => {
    const { clearStatusButton, postStatusButton } =
      renderPostStatusCompAndGetElements();

    expect(postStatusButton).toBeDisabled();
    expect(clearStatusButton).toBeDisabled();
  });

  // 2. Both buttons are enabled when the text field has text.
  it("enables buttons when text field has text", async () => {
    const { postTextBox, clearStatusButton, postStatusButton, user } =
      renderPostStatusCompAndGetElements();

    expect(postStatusButton).toBeDisabled();
    expect(clearStatusButton).toBeDisabled();

    await user.type(postTextBox, "a");

    expect(postStatusButton).toBeEnabled();
    expect(clearStatusButton).toBeEnabled();
  });

  // 3. Both buttons are disabled when the text field is cleared.
  it("disables the buttons when text is cleared", async () => {
    const { postTextBox, clearStatusButton, postStatusButton, user } =
      renderPostStatusCompAndGetElements();

    expect(postStatusButton).toBeDisabled();
    expect(clearStatusButton).toBeDisabled();

    await user.type(postTextBox, "a");

    expect(postStatusButton).toBeEnabled();
    expect(clearStatusButton).toBeEnabled();

    await user.clear(postTextBox);

    expect(postStatusButton).toBeDisabled();
    expect(clearStatusButton).toBeDisabled();
  });

  // 4. The presenter's postStatus method is called with correct parameters when the Post Status button is pressed.
  it("calls the presenter's postStatus method with the correct parameters when the post status button is clicked", async () => {
    const mockPresenter = mock<PostStatusPresenter>();
    const mockPresenterInstance = instance(mockPresenter);

    const text = "text";

    const { postTextBox, postStatusButton, user } =
      renderPostStatusCompAndGetElements(mockPresenterInstance);

    await user.type(postTextBox, text);

    expect(postStatusButton).toBeEnabled();
    await user.click(postStatusButton);

    verify(
      mockPresenter.submitPost(text, mockUserInstance, mockAuthTokenInstance)
    ).once();
  });
});

const renderPostStatusComp = (presenter?: PostStatusPresenter) => {
  return render(
    <MemoryRouter>
      {!!presenter ? (
        <PostStatus
          presenter={presenter}
          presenterGenerator={(view: PostStatusView) =>
            new PostStatusPresenter(view)
          }
        />
      ) : (
        <PostStatus
          presenterGenerator={(view: PostStatusView) =>
            new PostStatusPresenter(view)
          }
        />
      )}
    </MemoryRouter>
  );
};

const renderPostStatusCompAndGetElements = (
  presenter?: PostStatusPresenter
) => {
  const user = userEvent.setup();

  renderPostStatusComp(presenter);

  const postTextBox = screen.getByLabelText("postText");
  const postStatusButton = screen.getByLabelText("post");
  const clearStatusButton = screen.getByLabelText("clear");

  return { postTextBox, postStatusButton, clearStatusButton, user };
};
