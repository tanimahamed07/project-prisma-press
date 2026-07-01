import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import config from "./config";
import cookieParser from "cookie-parser";
import { prisma } from "./lib/prisma";
import { userRouters } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { postRouters } from "./modules/post/post.route";
import { commentRouters } from "./modules/comment/comment.route";
import { notFound } from "./middlewares/notFound";
import httpStatus from "http-status";
import { globalErrorHandler } from "./middlewares/globalErroandler";

const app: Application = express();
app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", async (req: Request, res: Response) => {
  const user = await prisma.user.findMany();
  console.log("=================>", user);
  res.send("hello, World!");
});

app.use("/api/users", userRouters);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRouters);
app.use("/api/comments", commentRouters);

app.use(notFound);

app.use(globalErrorHandler);

export default app;
