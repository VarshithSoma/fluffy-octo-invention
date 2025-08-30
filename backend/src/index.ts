import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { userRouter } from "./routes/userRoutes";
import { blogRoutes } from "./routes/blogRoutes";
const app = new Hono();
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRoutes);
export default app;
