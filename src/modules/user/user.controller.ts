import { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const registerUser = catchAsync(
  async (req: Request, res: Response, nex: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User register successfully",
      data: { user },
    });
  },
);

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    console.log(cookies);
    const { accessToken } = req.cookies;

    const verifiedToken = jwtUtils.verifiedToken(
      accessToken,
      config.jwt_access_secret,
    );

    if (typeof verifiedToken === "string") {
      throw new Error(verifiedToken);
    }
    const profile = await userService.getMyProfileFromDB(verifiedToken.id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile fetchd succesfully",
      data: { profile },
    });
  },
);

export const userController = {
  registerUser,
  getMyProfile,
};
