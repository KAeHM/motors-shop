import { Router } from "express";
import registerCommentController from "../controllers/comments/registerComment.controller";
import listCommentsController from "../controllers/comments/listComment.controller";
import tokenVerifierMiddleware from "../middleware/tokenVerifier.middleware";
import EditCommentController from "../controllers/comments/editComment.controller";
import deleteCommentController from "../controllers/comments/deleteComment.controller";

const routes = Router();

const commentsRoutes = () => {
  routes.post(
    "/register/:listingId",
    tokenVerifierMiddleware,
    registerCommentController
  );
  routes.get("/", listCommentsController);
  routes.patch("/edit/:id", tokenVerifierMiddleware, EditCommentController);
  routes.delete(
    "/delete/:id",
    tokenVerifierMiddleware,
    deleteCommentController
  );
  return routes;
};

export default commentsRoutes;
