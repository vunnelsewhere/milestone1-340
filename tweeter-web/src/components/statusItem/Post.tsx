import { Status, Type } from "tweeter-shared";
import { Link } from "react-router-dom";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfo from "../userInfo/UserInfoHook";
import useNavigateToUser from "../userInfo/userNavigationHook";

interface Props {
  status: Status;
}

const Post = (props: Props) => {
  const { displayErrorMessage } = useToastListener();
  const { setDisplayedUser, currentUser, authToken } = useUserInfo();
  // comes after Block-scoped variable 'setDisplayedUser' used before its declaration.ts(2448)
  const { navigateToUser } = useNavigateToUser(
    setDisplayedUser,
    displayErrorMessage
  ); // added prarmeter

  return (
    <>
      {props.status.segments.map((segment, index) =>
        segment.type === Type.alias ? (
          <Link
            key={index}
            to={segment.text}
            onClick={(event) => navigateToUser(event, currentUser, authToken)}
          >
            {segment.text}
          </Link>
        ) : segment.type === Type.url ? (
          <a
            key={index}
            href={segment.text}
            target="_blank"
            rel="noopener noreferrer"
          >
            {segment.text}
          </a>
        ) : segment.type === Type.newline ? (
          <br key={index} />
        ) : (
          segment.text
        )
      )}
    </>
  );
};

export default Post;

/*
onClick={(event) =>
              navigateToUser(
                event,
                setDisplayedUser,
                currentUser,
                authToken,
                displayErrorMessage
              )
            }
*/
