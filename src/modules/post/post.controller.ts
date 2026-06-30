import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { postService } from "./post.service";

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;
    const result = await postService.createPost(payload, id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Post Created Successfully",
      data: result,
    });
  },
);

const getAllPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query
    const result = await postService.getAllPost(query);
    console.log(result);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post Retrived successfully",
      data: result,
    });
  },
);

const getMyPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;

    const result = await postService.getMyPost(authorId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "My Post Retrived successfully",
      data: result,
    });
  },
);

const getPostStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getPostsStats();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post stats retrieved successfully",
      data: result,
    });
  },
);

const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    if (!postId) {
      throw new Error("post id required in params");
    }
    const result = await postService.getPostById(postId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "POST retrieved successfully",
      data: result,
    });
  },
);

const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    const postId = req.params.id;

    if (postId) {
      throw new Error("Post Id Required In Params");
    }

    const payload = req.body;
    console.log(postId);

    const result = await postService.updatePost(
      postId as string,
      payload,
      authorId as string,
      isAdmin,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "POST Updated successfully",
      data: result,
    });
  },
);

const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    const postId = req.params.postId;
    console.log(postId);

    if (!postId) {
      throw new Error("Post Id Required In Params");
    }

    const result = await postService.deletePost(
      postId as string,
      authorId as string,
      isAdmin,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "POST Deleted successfully",
      data: null,
    });
  },
);
export const postController = {
  createPost,
  getAllPost,
  getMyPost,
  getPostStats,
  getPostById,
  updatePost,
  deletePost,
};
