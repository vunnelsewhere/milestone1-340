import {
  PostStatusPresenter,
  PostStatusView,
} from "../../../src/presenter/status/PostStatusPresenter";
import { StatusService } from "../../../src/model/service/StatusService";
import {
  anything,
  capture,
  instance,
  mock,
  spy,
  verify,
  when,
} from "ts-mockito";
import { AuthToken, User } from "tweeter-shared";

describe("PostStatusPresenter", () => {
  // variable declarations
  let postStatusPresenter: PostStatusPresenter;
  let mockPostStatusView: PostStatusView;
  let mockStatusService: StatusService;

  let authToken = new AuthToken("token", Date.now());
  let user = new User("user", "name", "alias", "image_url");
  let post: string = "new post";

  // settings prior to test calls
  beforeEach(() => {
    mockPostStatusView = mock<PostStatusView>();
    const mockPostStatusViewInstance = instance(mockPostStatusView);

    const postStatusPresenterSpy = spy(
      new PostStatusPresenter(mockPostStatusViewInstance)
    );
    postStatusPresenter = instance(postStatusPresenterSpy);

    mockStatusService = mock<StatusService>();
    const mockStatusServiceInstance = instance(mockStatusService);

    when(postStatusPresenterSpy.service).thenReturn(mockStatusServiceInstance);
  });

  // 1. The presenter tells the view to display a posting status message.
  it("tells the view to display a posting status message", async () => {
    await postStatusPresenter.submitPost(post, user, authToken);

    verify(
      mockPostStatusView.displayInfoMessage("Posting status...", 0)
    ).once();
  });

  // 2. The presenter calls postStatus on the post status service with the correct status string and auth token.
  it("calls postStatus on the post status service with correct status string and auth token", async () => {
    await postStatusPresenter.submitPost(post, user, authToken);

    verify(mockStatusService.postStatus(authToken, anything())).once();

    let [capturedAuth, caputredStatus] = capture(
      mockStatusService.postStatus
    ).last();

    expect(capturedAuth).toEqual(authToken);
    expect(caputredStatus.post).toEqual(post);
  });

  // 3. When posting of the status is successful, the presenter tells the view to clear the last info message, clear the post, and display a status posted message.
  it("tells the view to clear the last info message, clear the post, and display a status posted message when posting is successful", async () => {
    await postStatusPresenter.submitPost(post, user, authToken);

    verify(mockPostStatusView.clearLastInfoMessage()).once();
    verify(mockPostStatusView.setPost("")).once();
    verify(
      mockPostStatusView.displayInfoMessage("Status posted!", 2000)
    ).once();

    verify(mockPostStatusView.displayErrorMessage(anything())).never();
  });

  // 4. When posting of the status is not successful, the presenter tells the view to display an error message and does not tell it to do the following: clear the last info message, clear the post, and display a status posted message.
  it("tells the view to display an error message and does not tell it to do the following: clear the last info message, clear the post, and display a status posted message when posting is not successful", async () => {
    const error = new Error("An error occurred");
    when(mockStatusService.postStatus).thenThrow(error);

    await postStatusPresenter.submitPost(post, user, authToken);

    verify(
      mockPostStatusView.displayErrorMessage(
        "Failed to post the status because of exception: An error occurred"
      )
    ).once();

    verify(mockPostStatusView.clearLastInfoMessage()).never();
    verify(mockPostStatusView.setPost("")).never();
    verify(
      mockPostStatusView.displayInfoMessage("Status posted!", 2000)
    ).never();
  });
});
