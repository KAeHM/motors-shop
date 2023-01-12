import { Router } from "express";
import editPasswordController from "../controllers/user/editPassword.controller";
import editUserController from "../controllers/user/editUser.controller";
import listUserProfileController from "../controllers/user/listUserProfile.controller";
import recoverPasswordController from "../controllers/user/recoverPassword.controller";
import registerUserController from "../controllers/user/registerUser.controller";
import { isThisEmailAlreadyBeingUsedMiddleware } from "../middleware/isThisEmailBeingUsed.middleware";
import tokenVerifierMiddleware from "../middleware/tokenVerifier.middleware";

const routes = Router();

const userRoutes = () => {
  routes.post(
    "/register",
    isThisEmailAlreadyBeingUsedMiddleware,
    registerUserController
  );
  routes.patch("/edit", tokenVerifierMiddleware, editUserController);
  routes.post("/password-recovery", recoverPasswordController);
  routes.patch("/edit-password", editPasswordController);
  routes.get("/profile", tokenVerifierMiddleware, listUserProfileController);

  return routes;
};

export default userRoutes;
