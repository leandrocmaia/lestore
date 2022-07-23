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
  })
  .query("products.findById", {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      return prisma.product.findUnique({ where: { id: input.id } });
    },
  })
  .mutation("products.create", {
    input: z.object({
      name: z.string(),
      price: z.number(),
      // photos: z.array(z.object({ url: z.string() })),
    }),
    async resolve({ input }) {
      return prisma.product.create({
        data: {
          name: input.name,
          price: input.price,
          user: {
            connect: {
              id: "cl5xpxmtf0085zu0jb0m1twfc",
            },
          },
          // photos: {
          //   create: input.photos.map((photo) => ({
          //     url: photo.url,
          //   })),
          // },
        },
      });
    },
  });

export type AppRouter = typeof appRouter;
