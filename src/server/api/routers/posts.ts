import { User } from "@clerk/nextjs/dist/types/server";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from " /server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profilePicture: user.profileImageUrl,
  };
};

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
      orderBy: { createdAt: "desc" },
    });

    const authorIds = posts.map((post) => post.authorId);
    const users = await clerkClient.users.getUserList({
      userId: authorIds,
      limit: 100,
    });

    const usersMap = new Map(
      users.map((user) => [user.id, filterUserForClient(user)])
    );

    return posts.map((post) => {
      const author = usersMap.get(post.authorId);
      if (!author) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Author not found" });
      }

      return {
        post,
        author: author,
      };
    });
  }),

  create: privateProcedure
    .input(
      z.object({
        content: z.string().min(1).max(280),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;
      const post = await ctx.prisma.post.create({
        data: {
          authorId,
          content: input.content,
        },
      });
    }),
});
