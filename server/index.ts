import { app } from "./app";

const server = Bun.serve({
  port: process.env.SERVER_PORT || 3000,
  fetch: app.fetch,
});

console.log(`Listening on http://localhost:${server.port}`);
