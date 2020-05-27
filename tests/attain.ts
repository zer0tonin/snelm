import { App, Request, Response } from "https://deno.land/x/attain/mod.ts";
import { Snelm } from "../mod.ts";

const app = new App();

// Configuring Snelm for Attain
const snelm = new Snelm("attain");
await snelm.init();

// Snelm Middleware for Attain
const snelmMiddleware = (req: Request, res: Response) => {
  res = snelm.snelm(req, res);
};

// Adding in the middleware
app.use(snelmMiddleware, (req, res) => {
  res.status(200).send({status: "Good"});
});

app.listen({ port: 3500 });

console.log("http://localhost:3500");
