// Import links
import { Link } from "react-router-dom";
import Post from "./Post";
import { AuthToken, FakeData, Status, User } from "tweeter-shared";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfo from "../userInfo/UserInfoHook";

/* Pass item to the component by creating a prop (property) for it */
interface Props {
  status: Status; // item.property
}

/* create a function to copy the duplicate inside */
const StatusItem = ({ status }: Props) => {
  // extract status property directly from the props
  // pass by property

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    const { displayErrorMessage } = useToastListener();
    const { setDisplayedUser, currentUser, authToken } = useUserInfo();

    event.preventDefault();

    try {
      let alias = extractAlias(event.target.toString());

      let user = await getUser(authToken!, alias);

      if (!!user) {
        if (currentUser!.equals(user)) {
          setDisplayedUser(currentUser!);
        } else {
          setDisplayedUser(user);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  };

  const extractAlias = (value: string): string => {
    let index = value.indexOf("@");
    return value.substring(index);
  };

  const getUser = async (
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias);
  };

  /* copy div hack: collapse the div, find the opening and closing tag */
  return (
    <div className="col bg-light mx-0 px-0">
      <div className="container px-0">
        <div className="row mx-0 px-0">
          <div className="col-auto p-3">
            <img
              src={status.user.imageUrl}
              className="img-fluid"
              width="80"
              alt="Posting user"
            />
          </div>
          <div className="col">
            <h2>
              <b>
                {status.user.firstName} {status.user.lastName}
              </b>{" "}
              -{" "}
              <Link
                to={status.user.alias}
                onClick={(event) => navigateToUser(event)}
              >
                {status.user.alias}
              </Link>
            </h2>
            {status.formattedDate}
            <br />
            <Post status={status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusItem;

