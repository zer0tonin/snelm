import { Application, MiddlewareFunc } from "https://deno.land/x/abc/mod.ts";
import { Snelm } from "../mod.ts";

const app = new Application();

// Configuring Snelm for ABC
const snelm = new Snelm("abc");
await snelm.init();

// Snelm Middleware for ABC
const SnelmMiddleware: MiddlewareFunc = next => c => {
    snelm.snelm(c.request, c.response);

    return next(c);
};

// Adding the Snelm Middleware to your web application
app.use(SnelmMiddleware);

app
    .get("/", c => {
        return "Abc";
    })
    .start({ port: 8080 });
