import "dotenv/config"; // loads DATABASE_URL from .env
import express from "express";
import cors from "cors";
import threadsRouter from "./routes/threads.js";
import prisma from "./prisma/client.js"; // import PrismaClient singleton

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/threads", threadsRouter);

const PORT = 3001;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Prisma connected to PostgreSQL");

    app.listen(PORT, () => {
      console.log(`Threadbase API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Prisma connection failed. Check DATABASE_URL in .env");
    console.error(err);
    process.exit(1);
  }
}

startServer();
