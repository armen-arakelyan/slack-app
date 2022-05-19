const express = require("express");
const app = express();
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportLocal = require("passport-local");

const SECRET_KEY = "SECRET_KEY";
const RREFRESH_KEY = "REFRESH_KEY";

const db = require("./db");

app.use(express.json());

const cors = require("cors");

app.use(cors());

app.use(passport.initialize());

passport.use(
  new passportLocal.Strategy(
    {
      usernameField: "mail",
    },

    async (mail, password, done) => {
      const user = await db.user.findOne({ mail });

      try {
        if (user === null) {
          return done(null, null, { message: "Incorrect email" });
        }

        if (await Bcrypt.compare(password, user.password)) {
          return done(null, user);
        }

        done(null, null, { message: "Incorrect password" });
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  Register.findById(id, (err, user) => {
    done(err, user);
  });
});

app.post("/refresh", async (req, res) => {
  // take the refresh token from the user
  const refreshToken = req.body.token;

  if (!refreshToken) return res.status(401).json("You are not authenticated!");

  jwt.verify(refreshToken, RREFRESH_KEY, async (err, user) => {
    err && console.log(err);

    try {
      const newAccessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: "3s",
      });
      const newRefreshToken = jwt.sign({ id: user.id }, RREFRESH_KEY, {
        expiresIn: "1800s",
      });

      if (!(newAccessToken && newRefreshToken))
        return res.status(401).json("Сheck your login details");

      const UserTokenFind = db.userToken.findOneAndUpdate(
        { userId: user.id },
        {
          userId: user.id,
          token: newRefreshToken,
        }
      );

      if (!UserTokenFind)
        return res.status(403).json("Refresh token is not valid!");

      await db.userToken.findOneAndUpdate(
        { userId: user.id },
        {
          userId: user.id,
          token: newRefreshToken,
        }
      );

      res.status(200).json({
        user: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      res.send(error.message);
    }
  });
});

const verifyAccessToken = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }

      req.payload = payload;

      next();
    });
  } catch (errors) {
    console.log("errors");
  }
};

app.post("/getUser", passport.authenticate("local"), (req, res) => {
  const { mail, password } = req.body;

  if (!mail || !password) {
    return res.send({ msg: "err" });
  }

  db.user
    .findOne({ mail: mail })
    .then(async (user) => {
      if (!user) {
        return res.send({ msg: "err" });
      } else {
        if (!Bcrypt.compareSync(password, user.password)) {
          res.send({ msg: "err" });
        } else {
          const token = jwt.sign({ id: user._id }, SECRET_KEY, {
            expiresIn: "18s",
          });
          const refreshToken = jwt.sign({ id: user._id }, RREFRESH_KEY, {
            expiresIn: "18000s",
          });

          await db
            .userToken({
              userId: user.id,
              token: refreshToken,
            })
            .save();

          res.send({ msg: "ok", user: token, refresh: refreshToken });
        }
      }
    })
    .catch(() => res.send({ msg: "err" }));
});

app.post("/addUser", (req, res) => {
  const { name, mail, password } = req.body;

  if (!name || !mail || !password) {
    return res.send({ msg: "err" });
  }

  db.user
    .findOne({ mail: mail })
    .then((user) => {
      if (user) {
        return res.send({ msg: "err" });
      } else {
        db.user
          .create({
            name: name,
            mail: mail,
            password: Bcrypt.hashSync(password, 10),
          })
          .then((user) => {
            const token = jwt.sign(
              { id: user._id, mail: user.mail },
              SECRET_KEY
            );
            res.send({ msg: "ok", token: token });
          })
          .catch(() => res.send({ msg: "err" }));
      }
    })
    .catch(() => res.send({ msg: "err" }));
});

app.get("/loginedPerson", verifyAccessToken, async (req, res) => {
  const { id } = req.payload;

  try {
    if (id) {
      const user = await db.user.findById({ _id: id }).select("-password");

      if (user) {
        return res.send(user);
      }
    }

    res.send("try again");
  } catch (error) {
    res.status(400).send({ name: "The query did not work" });
  }
});

app.get("/getChannels", async (req, res) => {
  const allChannels = await db.channels.find({});
  res.send(allChannels);
});

app.put("/addChannel/:channel", (req, res) => {
  db.channels
    .create({
      title: req.params.channel,
    })
    .then((channel) => {
      res.send({ msg: "ok", data: channel });
    })
    .catch(() => res.send({ msg: "err" }));
});

app.put("/updateChannel/:channel/:updatedChannel", (req, res) => {
  db.channels
    .findByIdAndUpdate(req.params.channel, {
      title: req.params.updatedChannel,
    })
    .then((channel) => res.send({ msg: "ok", data: channel }))
    .catch(() => res.send({ msg: "err" }));
});

app.delete("/removeChannel/:id", async (req, res) => {
  const data = await db.channels.findByIdAndDelete(req.params.id);
  res.send(data.length === 0 ? { msg: "err" } : { msg: "ok", data: data });
});

app.listen(8080);
