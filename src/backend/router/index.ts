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
      description: z.string().optional(),
      currency: z.string().optional(),
      photos: z.array(z.string()).optional(),
    }),
    async resolve({ input }) {
      const user = await prisma.user.findFirst();
      if (!user) {
        throw new Error("User not found");
      }

      return prisma.product.create({
        data: {
          name: input.name,
          price: input.price,
          description: input.description,
          currency: {
            connect: {
              code: input.currency,
            },
          },
          user: {
            connect: {
              id: user?.id,
            },
          },
          photos: {
            create: input.photos?.map((url) => ({
              url,
            })),
          },
        },
      });
    },
  });

export type AppRouter = typeof appRouter;
