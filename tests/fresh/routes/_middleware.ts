import { MiddlewareHandlerContext } from "https://deno.land/x/fresh/server.ts";
import { Snelm } from "../../../mod.ts";

// Configuring Snelm for the Fresh framework
const snelm = new Snelm("fresh");
await snelm.init();

// Snelm Middleware for Fresh
export async function handler(req: Request, ctx: MiddlewareHandlerContext) {
  const res: Response = snelm.snelm(req, await ctx.next());
  return res;
}
