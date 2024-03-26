import {AuthenticateResponse, LoginRequest} from "tweeter-shared" // go to index.ts in shared, update export, npm run build there

import { UserService } from "../model/service/UserService";

// aws console - default code
export const handler = async (
  event: LoginRequest
): Promise<AuthenticateResponse> => {
  if (event.alias === null || event.password === null) {
    throw new Error("[Bad Request] Bad request");
  }

  let response = null;
  try {
    response = new AuthenticateResponse(
      true,
      ...(await new UserService().login(event.alias, event.password)),
      null
    );
  } catch (error) {
    throw new Error(`[Database Error] ${error as Error}.message`);
  }
  return response;
};