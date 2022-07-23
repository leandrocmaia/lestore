import * as trpc from "@trpc/server";
import { z } from "zod";
import superjson from "superjson";
import { prisma } from "../../db/client";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .query("products.findAll", {
    async resolve() {
      return prisma.product.findMany({
        include: {
          photos: true,
        },
      });
    },
  });
// .query("products.findById", {
//   input: z.object({ id: z.string() }),
//   async resolve({ input }) {
//     return prisma.product.findUnique({ where: { id: input.id } });
//   },
// });

export type AppRouter = typeof appRouter;
