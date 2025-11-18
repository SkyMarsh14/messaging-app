import passport from "passport";
import LocalStrategy from "passport-local";
import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (!user) return done(null, false, { msg: "User not found." });
      const match = bcrypt.compare(password, user.password);
      if (!match)
        return done(null, false, {
          message: "Either password or username is wrong.",
        });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
