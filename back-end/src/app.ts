import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { appRoutes } from "./routes";

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
appRoutes(app);

export default app;
