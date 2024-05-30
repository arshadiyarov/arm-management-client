import { postAsync } from "shared";

type BodyType = {
  old_password: string;
  new_password: string;
};

export const postPasswordChange = async (
  token: string,
  body: BodyType,
): Promise<any> => postAsync("/change-password/", body, token);
