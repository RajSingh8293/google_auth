// // import express from "express";
// // const authRouter = express.Router();
// // import jwt from "jsonwebtoken";
// // import passport from "passport";
// // import bcrypt from "bcryptjs";
// // import User from "../models/User.js";
// // import auth from "../middleware/auth.js";

// // // -------------------- HELPER: Generate JWT & set cookie --------------------
// // const generateTokenAndSetCookie = (res, userId) => {
// //   const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
// //     expiresIn: "7d",
// //   });
// //   res.cookie("token", token, {
// //     httpOnly: true,
// //     secure: process.env.NODE_ENV === "production", // true in production
// //     sameSite: "lax",
// //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
// //   });
// //   return token;
// // };

// // // -------------------- SIGNUP (Email/Password) --------------------
// // authRouter.post("/signup", async (req, res) => {
// //   const { email, password, displayName } = req.body;

// //   if (!email || !password || !displayName) {
// //     return res.status(400).json({ message: "Please provide all fields" });
// //   }

// //   try {
// //     let user = await User.findOne({ email });
// //     if (user) return res.status(400).json({ message: "User already exists" });

// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     user = new User({
// //       email,
// //       password: hashedPassword,
// //       displayName,
// //     });

// //     await user.save();

// //     // Generate JWT and set cookie
// //     generateTokenAndSetCookie(res, user._id);

// //     // Return user data (without password)
// //     const userResponse = user.toObject();
// //     delete userResponse.password;
// //     res.status(201).json({ user: userResponse });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // // -------------------- LOGIN (Email/Password) --------------------
// // authRouter.post("/login", (req, res, next) => {
// //   passport.authenticate("local", (err, user, info) => {
// //     if (err) return next(err);
// //     if (!user) {
// //       return res.status(400).json({ message: info?.message || "Login failed" });
// //     }
// //     // Generate JWT and set cookie
// //     generateTokenAndSetCookie(res, user._id);
// //     const userResponse = user.toObject();
// //     delete userResponse.password;
// //     res.json({ user: userResponse });
// //   })(req, res, next);
// // });

// // // -------------------- GOOGLE AUTH --------------------
// // // Initiate Google OAuth
// // authRouter.get(
// //   "/google",
// //   passport.authenticate("google", { scope: ["profile", "email"] }),
// // );

// // // Google OAuth callback
// // authRouter.get(
// //   "/google/callback",
// //   passport.authenticate("google", {
// //     failureRedirect: `${process.env.CLIENT_URL}/login`,
// //   }),
// //   (req, res) => {
// //     // On success, generate JWT and set cookie
// //     generateTokenAndSetCookie(res, req.user._id);
// //     // Redirect to frontend profile page
// //     res.redirect(`${process.env.CLIENT_URL}/profile`);
// //   },
// // );

// // // -------------------- LOGOUT --------------------
// // authRouter.post("/logout", (req, res) => {
// //   res.clearCookie("token");
// //   res.json({ message: "Logged out successfully" });
// // });

// // // -------------------- GET CURRENT USER (PROFILE) --------------------
// // authRouter.get("/profile", auth, (req, res) => {
// //   // req.user already set by auth middleware
// //   const userResponse = req.user.toObject();
// //   delete userResponse.password;
// //   res.json({ user: userResponse });
// // });

// // export default authRouter;

// import express from "express";
// const authRouter = express.Router();
// import jwt from "jsonwebtoken";
// import passport from "passport";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";
// import auth from "../middleware/auth.js";

// // -------------------- TEST ROUTE (for debugging) --------------------
// authRouter.get("/test", (req, res) => {
//   res.json({ message: "Auth routes are working!" });
// });

// // -------------------- HELPER: Generate JWT & set cookie --------------------
// const generateTokenAndSetCookie = (res, userId) => {
//   const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });
//   return token;
// };

// // -------------------- SIGNUP --------------------
// authRouter.post("/signup", async (req, res) => {
//   const { email, password, displayName } = req.body;

//   if (!email || !password || !displayName) {
//     return res.status(400).json({ message: "Please provide all fields" });
//   }

//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: "User already exists" });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     user = new User({
//       email,
//       password: hashedPassword,
//       displayName,
//     });

//     await user.save();
//     generateTokenAndSetCookie(res, user._id);

//     const userResponse = user.toObject();
//     delete userResponse.password;
//     res.status(201).json({ user: userResponse });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // -------------------- LOGIN --------------------
// authRouter.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) return next(err);
//     if (!user) {
//       return res.status(400).json({ message: info?.message || "Login failed" });
//     }
//     generateTokenAndSetCookie(res, user._id);
//     const userResponse = user.toObject();
//     delete userResponse.password;
//     res.json({ user: userResponse });
//   })(req, res, next);
// });

// // -------------------- GOOGLE AUTH --------------------
// authRouter.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] }),
// );

// authRouter.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: `${process.env.CLIENT_URL}/login?error=google_auth_failed`,
//   }),
//   (req, res) => {
//     generateTokenAndSetCookie(res, req.user._id);
//     res.redirect(`${process.env.CLIENT_URL}/profile`);
//   },
// );

// // -------------------- LOGOUT --------------------
// authRouter.post("/logout", (req, res) => {
//   res.clearCookie("token");
//   res.json({ message: "Logged out successfully" });
// });

// // -------------------- PROFILE --------------------
// authRouter.get("/profile", auth, (req, res) => {
//   const userResponse = req.user.toObject();
//   delete userResponse.password;
//   res.json({ user: userResponse });
// });

// export default authRouter;

import express from "express";
const authRouter = express.Router();
import jwt from "jsonwebtoken";
import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

// -------------------- HELPER: Generate JWT & set cookie --------------------
const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};

// -------------------- SIGNUP --------------------
authRouter.post("/signup", async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!email || !password || !displayName) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashedPassword,
      displayName,
    });

    await user.save();
    generateTokenAndSetCookie(res, user._id);

    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json({ user: userResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------- LOGIN --------------------
authRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({ message: info?.message || "Login failed" });
    }
    generateTokenAndSetCookie(res, user._id);
    const userResponse = user.toObject();
    delete userResponse.password;
    res.json({ user: userResponse });
  })(req, res, next);
});

// -------------------- GOOGLE AUTH --------------------
// Initiate Google OAuth - NO SESSIONS
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false, // Important: Disable sessions
  }),
);

// Google OAuth callback - NO SESSIONS
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google_auth_failed`,
    session: false, // Important: Disable sessions
  }),
  (req, res) => {
    // On success, generate JWT and set cookie
    generateTokenAndSetCookie(res, req.user._id);
    // Redirect to frontend profile page
    res.redirect(`${process.env.CLIENT_URL}/profile`);
  },
);

// -------------------- LOGOUT --------------------
authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// -------------------- PROFILE --------------------
authRouter.get("/profile", auth, (req, res) => {
  const userResponse = req.user.toObject();
  delete userResponse.password;
  res.json({ user: userResponse });
});

export default authRouter;
