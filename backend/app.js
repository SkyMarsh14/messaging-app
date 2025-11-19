import express from "express";
import "dotenv/config";
import cors from "cors";
import "./config/passport.js";
import authRouter from "./routes/authRouter.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/*w", (req, res) => {
  return res.json({ msg: "Page not found." });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app started - listening on port ${PORT}`);
});
