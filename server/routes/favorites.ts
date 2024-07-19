import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { favoriteSchema } from "../../schemas";
import type { Favorite } from "../../schemas";

export const favoritesRoute = new Hono();

const fakeFavorites: Favorite[] = [
  {
    mal_id: 1,
    image_url: "https://cdn.myanimelist.net/images/anime/4/19644.jpg",
    title: "Cowboy Bebop",
  },
  {
    mal_id: 5,
    image_url: "https://cdn.myanimelist.net/images/anime/1439/93480.jpg",
    title: "Cowboy Bebop: Tengoku no Tobira",
  },
  {
    mal_id: 6,
    image_url: "https://cdn.myanimelist.net/images/anime/1130/120002.jpg",
    title: "Trigun",
  },
];

favoritesRoute
  .get("/", async (c) => {
    return c.json({ data: fakeFavorites }, 200);
  })
  .post("/", zValidator("json", favoriteSchema), async (c) => {
    const anime = await c.req.valid("json");
    fakeFavorites.push(anime);

    return c.json({ data: anime }, 201);
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number(c.req.param("id"));
    const anime = fakeFavorites.find((a) => a.mal_id === id);

    if (!anime) return c.notFound();

    return c.json({ data: anime }, 200);
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number(c.req.param("id"));
    const index = fakeFavorites.findIndex((anime) => anime.mal_id === id);

    if (index === -1) return c.notFound();

    fakeFavorites.splice(index, 1);

    return c.json(null, 204);
  });
