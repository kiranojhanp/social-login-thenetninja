const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      // options for google strategies
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      //   passport callbackfunction
      console.log('passport cb function fired');
      console.log(profile);
    }
  )
);
