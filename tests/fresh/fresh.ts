import * as fresh from "https://deno.land/x/fresh@1.0.2/server.ts"
import * as $0 from "./routes/_middleware.ts"
import * as $1 from "./routes/test.ts"

await fresh.start({
    routes: {
      "./routes/_middleware.ts": $0,
      "./routes/test.ts": $1,
    },
    islands: {},
    baseUrl: import.meta.url,
  })

