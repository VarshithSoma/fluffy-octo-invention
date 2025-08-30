import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

interface Env {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}

const app = new Hono<Env>();
app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const data = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    const token = await sign(
      {
        email: data.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 5,
      },
      c.env.JWT_SECRET
    );
    return c.json(token);
  } catch (error) {
    c.status(411);
    return c.text("Invalid");
  }
});

export default app;
