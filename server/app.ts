import { Hono } from "hono";
import { logger } from "hono/logger";

import { favoritesRoute, authRoute } from "./routes";

export const app = new Hono();
app.use(logger());

export const apiRoutes = app
  .basePath("/api")
  .route("/favorites", favoritesRoute)
  .route("/", authRoute);

export type ApiRoutes = typeof apiRoutes;
