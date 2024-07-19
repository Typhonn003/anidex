import { Hono } from "hono";
import { logger } from "hono/logger";

import { favoritesRoute } from "./routes";

export const app = new Hono();

app.use(logger());
app.get("/", (c) => c.text("Hono!"));
app.route("/favorites", favoritesRoute);
