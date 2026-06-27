import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// -------------------- LOCAL STRATEGY --------------------
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }
        if (!user.password) {
          return done(null, false, { message: "Account uses Google login" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

// -------------------- GOOGLE STRATEGY --------------------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile received:", profile.id);

        // Check if user already exists by googleId
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          console.log("Existing user found:", user.email);
          return done(null, user);
        }

        // Check if email already exists
        const email = profile.emails[0].value;
        user = await User.findOne({ email });
        if (user) {
          console.log("Linking Google account to existing user:", email);
          user.googleId = profile.id;
          user.avatar = profile.photos[0]?.value || user.avatar;
          await user.save();
          return done(null, user);
        }

        // Create new user
        console.log("Creating new user:", email);
        user = new User({
          googleId: profile.id,
          email,
          displayName: profile.displayName,
          avatar: profile.photos[0]?.value || "",
        });
        await user.save();
        return done(null, user);
      } catch (err) {
        console.error("Google strategy error:", err);
        return done(err);
      }
    },
  ),
);

// IMPORTANT: Do NOT use serialize/deserialize since we're using JWT
// Remove or comment out these lines:
// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

export default passport;

// // import passport from "passport";
// // import bcrypt from "bcryptjs";
// // import User from "../models/User.js";
// // import { Strategy as LocalStrategy } from "passport-local";
// // import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// // // -------------------- LOCAL STRATEGY --------------------
// // passport.use(
// //   new LocalStrategy(
// //     { usernameField: "email" },
// //     async (email, password, done) => {
// //       try {
// //         const user = await User.findOne({ email });
// //         if (!user) {
// //           return done(null, false, { message: "Invalid email or password" });
// //         }
// //         // If user signed up with Google, they won't have a password
// //         if (!user.password) {
// //           return done(null, false, { message: "Account uses Google login" });
// //         }
// //         const isMatch = await bcrypt.compare(password, user.password);
// //         if (!isMatch) {
// //           return done(null, false, { message: "Invalid email or password" });
// //         }
// //         return done(null, user);
// //       } catch (err) {
// //         return done(err);
// //       }
// //     },
// //   ),
// // );

// // // -------------------- GOOGLE STRATEGY --------------------
// // passport.use(
// //   new GoogleStrategy(
// //     {
// //       clientID: process.env.GOOGLE_CLIENT_ID,
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// //       callbackURL: process.env.GOOGLE_CALLBACK_URL,
// //     },
// //     async (accessToken, refreshToken, profile, done) => {
// //       try {
// //         // Check if user already exists by googleId or email
// //         let user = await User.findOne({ googleId: profile.id });
// //         if (user) return done(null, user);

// //         // Check if email already exists (maybe signed up with email/password)
// //         const email = profile.emails[0].value;
// //         user = await User.findOne({ email });
// //         if (user) {
// //           // Link Google account to existing user
// //           user.googleId = profile.id;
// //           user.avatar = profile.photos[0]?.value || user.avatar;
// //           await user.save();
// //           return done(null, user);
// //         }

// //         // Create new user
// //         user = new User({
// //           googleId: profile.id,
// //           email,
// //           displayName: profile.displayName,
// //           avatar: profile.photos[0]?.value || "",
// //         });
// //         await user.save();
// //         return done(null, user);
// //       } catch (err) {
// //         return done(err);
// //       }
// //     },
// //   ),
// // );

// // // Serialize/deserialize user (for session support – optional, but we'll keep it)
// // passport.serializeUser((user, done) => done(null, user.id));
// // passport.deserializeUser(async (id, done) => {
// //   try {
// //     const user = await User.findById(id);
// //     done(null, user);
// //   } catch (err) {
// //     done(err);
// //   }
// // });

// // export default passport;

// import passport from "passport";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";
// import { Strategy as LocalStrategy } from "passport-local";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// // LOCAL STRATEGY
// passport.use(
//   new LocalStrategy(
//     { usernameField: "email" },
//     async (email, password, done) => {
//       try {
//         const user = await User.findOne({ email });
//         if (!user) {
//           return done(null, false, { message: "Invalid email or password" });
//         }
//         if (!user.password) {
//           return done(null, false, { message: "Account uses Google login" });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//           return done(null, false, { message: "Invalid email or password" });
//         }
//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     },
//   ),
// );

// // GOOGLE STRATEGY
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL:
//         process.env.GOOGLE_CALLBACK_URL ||
//         "http://localhost:5000/api/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         console.log("Google profile received:", profile.id);

//         let user = await User.findOne({ googleId: profile.id });
//         if (user) {
//           console.log("Existing user found:", user.email);
//           return done(null, user);
//         }

//         const email = profile.emails[0].value;
//         user = await User.findOne({ email });
//         if (user) {
//           console.log("Linking Google account to existing user:", email);
//           user.googleId = profile.id;
//           user.avatar = profile.photos[0]?.value || user.avatar;
//           await user.save();
//           return done(null, user);
//         }

//         console.log("Creating new user:", email);
//         user = new User({
//           googleId: profile.id,
//           email,
//           displayName: profile.displayName,
//           avatar: profile.photos[0]?.value || "",
//         });
//         await user.save();
//         return done(null, user);
//       } catch (err) {
//         console.error("Google strategy error:", err);
//         return done(err);
//       }
//     },
//   ),
// );

// // // Serialize/deserialize
// // passport.serializeUser((user, done) => done(null, user.id));
// // passport.deserializeUser(async (id, done) => {
// //   try {
// //     const user = await User.findById(id);
// //     done(null, user);
// //   } catch (err) {
// //     done(err);
// //   }
// // });

// export default passport;
