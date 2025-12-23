import express from "express";
import "dotenv/config";
import cors from "cors";
import "./config/passport.js";
import "./config/cloudinary.js";
import passport from "passport";
import authRouter from "./routes/authRouter.js";
import messageRouter from "./routes/messageRouter.js";
import userRouter from "./routes/userRouter.js";
import errorGlobal from "./middleware/errorGlobal.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use(
  "/message",
  passport.authenticate("jwt", { session: false }),
  messageRouter
);
app.use("/user", passport.authenticate("jwt", { session: false }), userRouter);
app.use(errorGlobal);
app.use("/*w", (req, res) => {
  return res.status(404).json({
    error: "Requested route does not exist",
    path: req.originalUrl,
    method: req.method,
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app started - listening on port ${PORT}`);
});
