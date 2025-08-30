import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
blogRoutes.use("/*", async (c, next) => {
  const token = c.req.raw.headers.get("authorization")?.split(" ")[1] || "";
  const data = await verify(token, c.env.JWT_SECRET);
  if (data && data.userId) {
    // @ts-ignore
    c.set("userId", data.userId);
    await next();
  } else {
    c.status(403);
    return c.json("you are not logged in");
  }
});
blogRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const data = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: c.get("userId"),
    },
  });
  return c.json(data);
});

// blogRoutes.put("/", async (c) => {
//   const body = await c.req.json();
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   const data = await prisma.post.update({
//     where:{
//         id:1;
//     },
//     data: {
//       title: body.title,
//       content: body.content,
//     },
//   });
//   return c.json(data);
// });
