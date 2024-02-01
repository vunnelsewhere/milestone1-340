/*Purpose: hide context inside of a hook 
such that other files don't have to deal with the "context" 
to structure the information that the context provides without knowing about context*/

// const { currentUser, authToken } = useContext(UserInfoContext);

// Import List
import { useContext } from "react";
import { UserInfoContext } from "./UserInfoProvider";

const useUserInfo = () => useContext(UserInfoContext);

export default useUserInfo;

/* After we create this, go through places that said useContext and replace it with useUserInfo
* import this .ts file, delete the 2 import file for "context"
DONE!!
*/