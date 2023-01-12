import { Router } from "express";
import deleteListingController from "../controllers/listing/deleteListing.controller";
import editListingController from "../controllers/listing/editListing.controller";
import listListingsController from "../controllers/listing/listListings.controller";
import listOneListingController from "../controllers/listing/listOneListing.controller";
import listUserListingsController from "../controllers/listing/listUserListings.controller";
import registerListingController from "../controllers/listing/registerListing.controller";
import tokenVerifierMiddleware from "../middleware/tokenVerifier.middleware";

const routes = Router();

const listingsRoutes = () => {
  routes.post("/register", tokenVerifierMiddleware, registerListingController);
  routes.get("/seller/:id", listUserListingsController);
  routes.get("/", listListingsController);
  routes.get("/:id", listOneListingController);
  routes.patch("/edit/:id", tokenVerifierMiddleware, editListingController);
  routes.delete(
    "/delete/:id",
    tokenVerifierMiddleware,
    deleteListingController
  );

  return routes;
};

export default listingsRoutes;
