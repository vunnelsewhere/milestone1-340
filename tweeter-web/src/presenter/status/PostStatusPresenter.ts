import { AuthToken, Status, User } from "tweeter-shared";
import { MessageView, Presenter } from "../Presenter";
import { StatusService } from "../../model/service/StatusService";


export interface PostStatusView extends MessageView {
  setPost: (value: string) => void;
}

export class PostStatusPresenter extends Presenter {
  private _service: StatusService | null = null;


  public constructor(view: PostStatusView) {
    super(view);
    this._service = new StatusService();
  }

  protected get view() {
    return super.view as PostStatusView;
  }

  public get service() {
    if (this._service == null) {
      this._service = new StatusService();
    }

    return this._service;
  }

  public async submitPost(
    post: string,
    currentUser: User,
    authToken: AuthToken
  ) {
    this.doFailureReportingOperation(async () => {
      this.view.displayInfoMessage("Posting status...", 0);

      let status = new Status(post, currentUser!, Date.now());

      await this.service.postStatus(authToken!, status);

      this.view.clearLastInfoMessage();
      this.view.setPost("");
      this.view.displayInfoMessage("Status posted!", 2000);
    }, "post the status");
  }
}