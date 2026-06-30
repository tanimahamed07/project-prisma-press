import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { postController } from "./post.controller";

const router = Router();

router.post("/", auth(Role.ADMIN, Role.USER, Role.AUTHOR), postController.createPost);

router.get("/", postController.getAllPost);

router.get(
  "/my-post",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  postController.getMyPost,
);
router.get("/stats", auth(Role.ADMIN), postController.getPostStats);

router.get("/:postId", postController.getPostById);
router.patch(
  "/:id",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  postController.updatePost,
);

router.delete('/:postId', auth(Role.USER, Role.ADMIN, Role.AUTHOR), postController.deletePost)

export const postRouters = router;
