const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user-model");

// serialize cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize cookie
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategies
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // check if user already exists
      User.findOne({ googleId: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            //   already have the user
            console.log(currentUser + " exists");
            done(null, currentUser);
          } else {
            //   create new user in database
            new User({
              username: profile.displayName,
              googleId: profile.id,
              thumbnail: profile._json.picture
            })
              .save()
              .then((newUser) => {
                console.log(newUser + " is saved in database");
                done(null, newUser);
              })
              .catch(() => {
                console.log("Error occurred saving the user");
              });
          }
        })
        .catch(console.log("Unexpected error occured"));
    }
  )
);
