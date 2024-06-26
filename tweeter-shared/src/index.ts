export { Follow } from "./model/domain/Follow";
export { PostSegment, Type } from "./model/domain/PostSegment";
export { Status } from "./model/domain/Status";
export { User } from "./model/domain/User";
export { AuthToken } from "./model/domain/AuthToken";

// All classes that should be avaialble to other modules need to exported here. export * does not work when 
// uploading to lambda. Instead we have to list each export.

export { FakeData } from "./util/FakeData";


// for milestone 3 - DON"T FORGET TO RUN npm run build to make these available

export { TweeterRequest } from "./model/net/request/Request"; // base classes
export { TweeterResponse } from "./model/net/response/Response";

export { LoginRequest } from "./model/net/request/LoginRequest"; // authentication classes
export { RegisterRequest } from "./model/net/request/RegisterRequest";
export { AuthenticateResponse } from "./model/net/response/AuthenticateResponse";

export { FollowRequest } from "./model/net/request/FollowRequest"; // follow 
export { FollowResponse } from "./model/net/response/FollowResponse";

export { FollowStatusRequest } from "./model/net/request/FollowStatusRequest"; // is follow status 
export { FollowStatusResponse } from "./model/net/response/FollowStatusResponse";

export { GetUserResponse } from "./model/net/response/GetUserResponse"; // get user

export { GetFollowCountResponse } from "./model/net/response/GetFollowCountResponse"; // count follow
export { GetFollowCountRequest } from "./model/net/request/GetFollowCountRequest";

export { LoadMoreItemsRequest } from "./model/net/request/LoadMoreItemsRequest"; // load item
export { LoadMoreItemsResponse } from "./model/net/response/LoadMoreItemsResponse";

export { LoadMoreUsersResponse } from "./model/net/response/LoadMoreUsersResponse"; // load user
export { LoadMoreUsersRequest } from "./model/net/request/LoadMoreUsersRequest";

export { PostStatusRequest } from "./model/net/request/PostStatusRequest"; // post status

// package.json - manage dependencies "npm init -y"
// package.json - import share module "npm i ../tweeter-shared/" *copy dependencies from tweeter-shared to there too & install those using "npm i"
// we only upload javascript
// using "tsc -- init" (we convert the tweeter-server to a module)
// "outDir": "./dist" in tsconfig: when we transpile ts to js code, those go to the dist folder
// run tsc in tweeter-server to transpile code - goes to dist