import { Hono } from "hono";

export const favoritesRoute = new Hono();

const fakeFavorites = [
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
  .post("/", async (c) => {
    return c.json({});
  });
//  .put()
//  .delete();
