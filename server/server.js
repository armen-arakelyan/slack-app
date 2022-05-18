const express = require("express");
const app = express();
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportLocal = require("passport-local");

const SECRET_KEY = "SECRET_KEY";

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
)

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
  Register.findById(id, (err, user) => {
    done(err, user);
  })
})

const getUserByToken = (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      const authorization = token;
      let decoded;
      try {
        decoded = jwt.verify(authorization, SECRET_KEY);
      } catch {
        reject("Token not valid");
        return;
      }
      const userId = decoded.id;
      db.user
        .findOne({ _id: userId })
        .then((user) => resolve(user))
        .catch(() => reject("Token error"));
    } else {
      reject("Token is not found");
    }
  });
};

app.post("/getUser", passport.authenticate("local") , (req, res) => {
  const { mail, password } = req.body

  if (!mail || !password) {
      return res.send({ msg: 'err' })
  }

  db.user.findOne({ mail: mail })
  .then(user => {    
      if (!user) {
          return res.send({ msg: 'err' })
      } else {
          if (!Bcrypt.compareSync(password, user.password)) {
              res.send({ msg: 'err' })
          } else {
              const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY)
              res.send({ msg: 'ok', user: token })
          }
      }
  }).catch(() => res.send({ msg: 'err' }))
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

app.get("/loginedPerson/:token", (req, res) => {
  getUserByToken(req.params.token)
    .then((user) => res.send({ msg: "ok", user: user }))
    .catch(() => res.send({ msg: "err" }));
});

app.get('/getChannels', async (req, res) => {
  const allChannels = await db.channels.find({})
  res.send(allChannels)
})

app.put('/addChannel/:channel', (req, res) => {
  db.channels.create({
    channels: req.params.channel
  }).then(channel => {
    res.send({ msg: 'ok', data: channel })
  }).catch(() => res.send({ msg: 'err' }))
})

app.listen(8080);
