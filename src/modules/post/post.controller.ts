import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import  httpStatus  from "http-status";
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
        message: 'Post Created Successfully',
        data: result
    })
  },
);

const getAllPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getAllPost()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Post Retrived successfully',
        data: result
    })
  },
);

const getMyPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const getPostStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
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
