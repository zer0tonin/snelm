# Snelm: Improved Security Middleware for Deno Web Frameworks

Snelm is a fully customizable security middleware for the major Deno web frameworks. Snelm is based largely on code from the [helmet](https://www.npmjs.com/package/helmet) middleware for NodeJS. Snelm currently has built in support and examples for the following Deno web frameworks:

 * **[Oak](https://deno.land/x/oak)** framework
 * **[ABC](https://deno.land/x/abc)** framework
 * **[Alosaur](https://deno.land/x/alosaur)** framework
 * **[Pogo](https://deno.land/x/pogo)** framework
 * **[Aqua](https://deno.land/x/aqua)** framework
 * **[Attain](https://deno.land/x/attain)** framework
 * **[Fresh](https://deno.land/x/fresh)** framework

## Basic Usage

Snelm has a very easy and unified interface for all the major web frameworks. You simply import snelm, choose a framework, initialize it, and then pass the **request** and **response** objects from your chosen framework into the snelm function. Snelm will return the original response object with various headers set to improve security without having to set any configurations. For example, to use snelm with the **Oak framework**:

```javascript
import { Application } from "https://deno.land/x/oak/mod.ts";

// Importing Snelm
import { Snelm } from "https://deno.land/x/snelm/mod.ts";

const app = new Application();

// Creating and initializing a Snelm object and setting Oak as the framework
const snelm = new Snelm("oak");
await snelm.init();

// Passing the request and response object into the snelm function. That's all
// you need to do to use Snelm! Now all responses objects will have the
// additional security measures provided by Snelm.
app.use((ctx, next) => {
    ctx.response = snelm.snelm(ctx.request, ctx.response);

    next();
});

app.use((ctx) => {
    ctx.response.body = "Oak";
});

await app.listen({ port: 8000 });
```

## Configuring Snelm

Snelm is fully customizable, and uses very similar configurations as the underlying components used in the NodeJS [helmet](https://www.npmjs.com/package/helmet) middleware. Snelm includes the following components with the following keys to configure them. You can follow any of these links to the respective NPM repositories to learn more about what each component does and what configuration options are available:

 * **[X-Permitted-Cross-Domain-Policies Middleware](https://www.npmjs.com/package/helmet-crossdomain)** -> `crossDomain`
 * 	**[Content Security Policy Middleware](https://www.npmjs.com/package/helmet-csp)** -> `csp`
 * **[DNS Prefetch Control Middleware](https://www.npmjs.com/package/dns-prefetch-control)** -> `dnsPrefetchControl`
 * **[Dont Sniff Mimetype Middleware](https://www.npmjs.com/package/dont-sniff-mimetype)** -> `dontSniffMimetype`
 * **[Expect-CT Middleware](https://www.npmjs.com/package/expect-ct)** -> `expectCt`
 * **[Feature Policy Middleware](https://www.npmjs.com/package/feature-policy)** -> `featurePolicy`
 * **[Frameguard Middleware](https://www.npmjs.com/package/frameguard)** -> `frameguard`
 * **[Hide X-Powered-By Middleware](https://www.npmjs.com/package/hide-powered-by)** -> `hidePoweredBy`
 * **[HTTP Strict Transport Security Middleware](https://www.npmjs.com/package/hsts)** -> `hsts`
 * **[Internet Explorer Restrict Untrusted HTML Middleware](https://www.npmjs.com/package/ienoopen)** -> `ieNoOpen`
 * **[Referrer Policy Middleware](https://www.npmjs.com/package/referrer-policy)** -> `referrerPolicy`
 * **[X-XSS-Protection Middleware](https://www.npmjs.com/package/x-xss-protection)** -> `xssProtection`

Any individual component can be disabled by setting its key to `null`. For example, if we wanted to remove the Hide X-Powered-By Middleware, we can configure Snelm like so:

```javascript
const snelm = new Snelm("oak", {
    hidePoweredBy: null,
});
```

Or if we wanted to disable all of the components:

```javascript
const snelm = new Snelm("pogo", {
    crossDomain: null,
    csp: null,
    dnsPrefetchControl: null,
    dontSniffMimetype: null,
    expectCt: null,
    featurePolicy: null,
    frameguard: null,
    hidePoweredBy: null,
    hsts: null,
    ieNoOpen: null,
    referrerPolicy: null,
    xssProtection: null,
});
```

We can configure components using the same inputs as the middleware they are based on. For example, the Referrer Policy Middleware accepts parameters to change the referrer policy:

```javascript
const snelm = new Snelm("oak", {
    referrerPolicy: {
        policy: 'same-origin',
    },
});
```

Finally, below is an example of setting many configurations to various components within Snelm to demonstrate some of the configurations for the components:

```javascript
// crossDomain config
const crossDomainConfig = {
    permittedPolicies: 'none',
};

// csp config
const cspConfig = { 
    // Specify directives as normal.
    directives: {
    defaultSrc: ["'self'", 'default.com'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ['style.com'],
        fontSrc: ["'self'", 'fonts.com'],
        imgSrc: ['img.com', 'data:'],
        sandbox: ['allow-forms', 'allow-scripts'],
        reportUri: '/report-violation',
        objectSrc: ["'none'"],
        upgradeInsecureRequests: true,
        workerSrc: false  // This is not set.
    },
 
    // This module will detect common mistakes in your directives and throw errors
    // if it finds any. To disable this, enable "loose mode".
    loose: false,
 
    // Set to true if you only want browsers to report errors, not block them.
    // You may also set this to a function(req, res) in order to decide dynamically
    // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
    reportOnly: false,
 
    // Set to true if you want to blindly set all headers: Content-Security-Policy,
    // X-WebKit-CSP, and X-Content-Security-Policy.
    setAllHeaders: false,
 
    // Set to true if you want to disable CSP on Android where it can be buggy.
    disableAndroid: false,
 
    // Set to false if you want to completely disable any user-agent sniffing.
    // This may make the headers less compatible but it will be much faster.
    // This defaults to `true`.
    browserSniff: true
};

// dnsPrefetchControl config
const dnsPrefetchControlConfig = {
    allow: true,
};

// expectCt config
const expectCtConfig = {
    enforce: true,
    maxAge: 30,
    reportUri: 'https://example.com/report'
};

// featurePolicy config
const featurePolicyConfig = {
    features: {
        fullscreen: ["'self'"],
        vibrate: ["'none'"],
        payment: ['example.com'],
        syncXhr: ["'none'"]
    }
};

// frameguard config
const frameguardConfig = {
    action: 'allow-from',
    domain: 'https://example.com'
};

// hidePoweredBy config
const hidePoweredByConfig = {
    setTo: 'PHP 4.2.0',
};

// hsts config
const hstsConfig = {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
};

// referrerPolicy config
const referrerPolicyConfig = {
    policy: 'same-origin',
};

// xssProtection config
const xssProtectionConfig = {
    setOnOldIE: true,
    reportUri: '/report-xss-violation',
    mode: null,
};

// Adding configuration to snelm
const snelm = new Snelm("pogo", { 
    crossDomain: crossDomainConfig,
    csp: cspConfig,
    dnsPrefetchControl: dnsPrefetchControlConfig,
    expectCt: expectCtConfig,
    featurePolicy: featurePolicyConfig,
    frameguard: frameguardConfig,
    hidePoweredBy: hidePoweredByConfig,
    hsts: hstsConfig,
    referrerPolicy: referrerPolicyConfig,
    xssProtection: xssProtectionConfig,
});
```

## Middleware Examples for Major Deno Web Frameworks

Currently Snelm supports the Oak, ABC, Alosaur, and Pogo frameworks. Below I have written middleware examples you can add to your web applications to quickly make use Snelm. Make sure to add the middleware before other routes so that the middleware will be applied to the routes below it. Feel free to copy and paste this code into your own web application!

### Oak

Snelm Middleware example for Oak:

```javascript
import { Application } from "https://deno.land/x/oak/mod.ts";
import { Snelm } from "https://deno.land/x/snelm/mod.ts";

const app = new Application();

// Configuring Snelm for the Oak framework
const snelm = new Snelm("oak");
await snelm.init();

// Snelm Middleware for Oak
app.use((ctx, next) => {
    ctx.response = snelm.snelm(ctx.request, ctx.response);

    next();
});

app.use((ctx) => {
    ctx.response.body = "Oak";
});

await app.listen({ port: 8000 });
```

### ABC

Snelm Middleware example for ABC:

```javascript
import { Application, MiddlewareFunc } from "https://deno.land/x/abc/mod.ts";
import { Snelm } from "https://deno.land/x/snelm/mod.ts";

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
```


### Alsosaur

Snelm Middleware example for Alosaur:

```typescript
import { Controller, Get, Area, App, ServerRequest, ServerResponse } from 'https://deno.land/x/alosaur/src/mod.ts';
import { Middleware } from 'https://deno.land/x/alosaur/src/decorator/Middleware.ts';
import { MiddlewareTarget } from 'https://deno.land/x/alosaur/src/models/middleware-target.ts';
import { Snelm } from "https://deno.land/x/snelm/mod.ts";

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
```

### Pogo

As Pogo does not support middleware currently, you'll have to call snelm within the individual routes:

```javascript
import pogo from 'https://deno.land/x/pogo/main.ts';
import { Snelm } from "https://deno.land/x/snelm/mod.ts";

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
```

### Aqua

```javascript
import Aqua from "https://deno.land/x/aqua/aqua.ts";
import { Snelm } from "https://deno.land/x/snelm/mod.ts";

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
```

### Attain

```typescript
import { App, Request, Response } from "https://deno.land/x/attain/mod.ts";
import { Snelm } from "https://deno.land/x/snelm/mod.ts";

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
```

### Fresh

```typescript
import { MiddlewareHandlerContext } from "https://deno.land/x/fresh/server.ts";
import { Snelm } from "https://deno.land/x/snelm/mod.ts";

// Configuring Snelm for the Fresh framework in the _middleware.ts file
const snelm = new Snelm("fresh");
await snelm.init();

// Snelm Middleware for Fresh
export async function handler(req: Request, ctx: MiddlewareHandlerContext) {
  const res: Response = snelm.snelm(req, await ctx.next());
  return res;
}
```

# License

MIT License

Copyright (c) 2020 Anthony Mancini

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

