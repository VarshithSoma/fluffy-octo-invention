import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "@varshithsoma/common-app";

interface Env {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}

export const userRouter = new Hono<Env>();
userRouter.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const result = signupInput.safeParse({
      email: body.email,
      password: body.password,
      name: body.name,
    });
    if (!result.success) {
      return c.text("invalid input");
    }
    const data = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const token = await sign(
      {
        userId: data.id,
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

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const result = signinInput.safeParse({
      email: body.email,
      password: body.password,
    });
    if (!result.success) {
      return c.text("invalid input");
    }
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return c.text("no user found");
    }
    if (user.password != body.password) {
      return c.text("wrong password");
    }
    const token = await sign(
      {
        userId: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 15,
      },
      c.env.JWT_SECRET
    );
    return c.json(token);
  } catch (error) {
    c.status(403);
    return c.text("cant find the user");
  }
});
