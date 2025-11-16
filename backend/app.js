import express from "express";
import "dotenv/config";
import cors from "cors";
import session from "express-session";
import passport from "passport";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app started - listening on port ${PORT}`);
});
