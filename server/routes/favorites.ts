import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { favoriteSchema } from "../../schemas";
import { getUser } from "../kinde";
import { db } from "../db/database";
import { favorites as favoritesTable } from "../db/schemas";
import { and, eq } from "drizzle-orm";

export const favoritesRoute = new Hono();

favoritesRoute
  .get("/", getUser, async (c) => {
    const user = c.var.user;

    const favorites = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userId, user.id));

    return c.json({ data: favorites }, 200);
  })
  .post("/", getUser, zValidator("json", favoriteSchema), async (c) => {
    const user = c.var.user;
    const anime = c.req.valid("json");

    const result = await db
      .insert(favoritesTable)
      .values({
        malId: anime.mal_id,
        title: anime.title,
        imageUrl: anime.image_url,
        userId: user.id,
      })
      .returning()
      .then((res) => res[0]);

    return c.json({ data: result }, 201);
  })
  .get("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number(c.req.param("id"));
    const user = c.var.user;

    const anime = await db
      .select()
      .from(favoritesTable)
      .where(
        and(eq(favoritesTable.userId, user.id), eq(favoritesTable.malId, id))
      )
      .then((res) => res[0]);

    if (!anime) return c.notFound();

    return c.json({ data: anime }, 200);
  })
  .delete("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number(c.req.param("id"));
    const user = c.var.user;

    const result = await db
      .delete(favoritesTable)
      .where(
        and(eq(favoritesTable.userId, user.id), eq(favoritesTable.malId, id))
      )
      .returning()
      .then((res) => res[0]);

    if (result) return c.notFound();

    return c.json(null, 204);
  });
