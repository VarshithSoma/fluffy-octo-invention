import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
interface Env {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}

export const blogRoutes = new Hono<Env>();
blogRoutes.use("/*", async (c, next) => {
  try {
    const token = c.req.raw.headers.get("authorization")?.split(" ")[1] || "";
    const data = await verify(token, c.env.JWT_SECRET);
    if (data) {
      // @ts-ignore
      c.set("userId", data.userId);
      await next();
    } else {
      c.status(403);
      return c.json("not logged in ");
    }
  } catch (error) {
    c.status(403);
    return c.json("token expired");
  }
});
blogRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const data = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId"),
      },
    });
    return c.json(data);
  } catch (error) {
    return c.text("some error occured");
  }
});

blogRoutes.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const data = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json(data);
});
blogRoutes.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const data = await prisma.post.findMany();
    return c.json(data);
  } catch (err) {
    console.log(err);
  }
});

blogRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const data = await prisma.post.findFirst({
    where: {
      id: id,
    },
  });
  return c.json(data);
});
