import express from "express";
import cors from "cors";
import connectMongo from "./misc/databases/connectMongo";
import connectRedis from "./misc/databases/connectRedis";

// Import routerów
import userRouter from "./routes/users";
import quizRouter from "./routes/quiz";
import gameRouter from "./routes/games";
import shopRouter from "./routes/shop";
import leaderBoardRouter from "./routes/leaderboard";

const app = express();
const PORT = process.env.PORT || 3000;

// Połączenia z bazami danych
connectMongo();
connectRedis();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:8080",
      "http://frontend:8080",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/users", userRouter);
app.use("/quiz", quizRouter);
app.use("/game", gameRouter);
app.use("/shop", shopRouter);
app.use("/lb", leaderBoardRouter)

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT as number, () => {
  console.log(`${new Date().toISOString()} - Server running on port ${PORT}`);
});
