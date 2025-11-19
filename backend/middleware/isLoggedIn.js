function isLoggedIn(req, res, next) {
  if (req.isAuthenticaed()) {
    return next();
  }
  res.json({ msg: "This is a protected route that reuqires login" });
}
export default isLoggedIn;
