import { Hono } from "hono";
import { logger } from "hono/logger";

import { favoritesRoute } from "./routes";

export const app = new Hono();
app.use(logger());

export const apiRoutes = app
  .basePath("/api")
  .route("favorites", favoritesRoute);

export type ApiRoutes = typeof apiRoutes;
