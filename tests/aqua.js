import Aqua from "https://deno.land/x/aqua/aqua.ts";
import { Snelm } from "../mod.ts";

const app = new Aqua(8000);

// Configuring Snelm for Aqua
const snelm = new Snelm("aqua");
await snelm.init();

// Snelm Middleware for Aqua
app.register((request, response) => {
    response.headers = new Headers();
    response = snelm.snelm(request, response);

    return response;
});

app.get("/", (request, response) => {
    return "Aqua";
});