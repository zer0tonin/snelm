import pogo from 'https://deno.land/x/pogo/main.ts';
import { Snelm } from "../mod.ts";

const server = pogo.server({ port : 55555 });

// Configuring Snelm for Pogo
const snelm = new Snelm("pogo");
await snelm.init();

server.router.get('/', (request, handler) => {
	// Using Snelm in a route
	request.response = snelm.snelm(request, request.response);
    request.response.body = "Pogo";

    return request.response;
});	

server.start();
