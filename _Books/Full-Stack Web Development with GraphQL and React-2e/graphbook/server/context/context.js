import { db } from "../db/index.js";
import { PostService } from "../services/post.service.js";
import { getUserFromReq } from "../utils/auth.js";
import { UserService } from "../services/user.service.js";

export async function createContext({ req }) {
  const user = await getUserFromReq(req);

  return {
    db,
    user,
    services: {
      postService: new PostService(db),
      userService: new UserService(db),
    },
  };
}
