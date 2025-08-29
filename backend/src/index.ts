import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));

app.post("/api/v1/signup", (c) => c.text("Signup route"));
app.post("/api/v1/login", (c) => c.text("Login route"));
app.post("/api/v1/blog", (c) => c.text("Create blog"));
app.put("/api/v1/blog", (c) => c.text("Update blog"));
app.get("/api/v1/blog/:id", (c) => c.text("Get blog by id"));

export default app;
