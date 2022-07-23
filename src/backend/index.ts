import * as trpc from "@trpc/server";
const appRouter = trpc.router()
.query()

// only export *type signature* of router!
// to avoid accidentally importing your API
// into client-side code
export type AppRouter = typeof appRouter;
