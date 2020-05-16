import { Controller, Get, Area, App, ServerRequest, ServerResponse } from 'https://deno.land/x/alosaur/src/mod.ts';
import { Middleware } from 'https://deno.land/x/alosaur/src/decorator/Middleware.ts';
import { MiddlewareTarget } from 'https://deno.land/x/alosaur/src/models/middleware-target.ts';
import { Snelm } from "../mod.ts";

// Configuring Snelm for Alosaur
const snelm = new Snelm("alosaur");
await snelm.init();

// Snelm Middleware for Alosaur
@Middleware(new RegExp('/'))
export class SnelmMiddleware implements MiddlewareTarget {
    onPreRequest(request: ServerRequest, response: ServerResponse) {
        return new Promise((resolve, reject) => {
            snelm.snelm(request, response);
            resolve();
        });
    }

    onPostRequest(request: ServerRequest, response: ServerResponse) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}

@Controller('/')
export class MainController {
    @Get('')
    text() {
        return 'Alosaur';
    }
}

// Declare module	
@Area({
    controllers: [MainController],
})
export class MainArea {}

// Create alosaur application
const app = new App({
    areas: [MainArea],
    // Adding the Snelm Middleware to the application
    middlewares: [SnelmMiddleware],
});

app.listen();
