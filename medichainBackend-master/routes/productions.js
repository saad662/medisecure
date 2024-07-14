const express = require("express");
const router = express.Router();
const Productions = require("../models/Productions").Productions;
const verifyToken = require("../middlewares/verifyToken").ProductionVerifyToken;

//protected route
router.get("/getAll", (req, res) => {
  try {
    const production = Productions.find();
    console.log(production, "Productions");

    production
      .then((allProductions) => {
        res.send({ result: allProductions });
      })
      .catch((e) => {
        res.send({ message: e.message });
      });
  } catch (e) {
    res.send({ message: "invalid request" });
  }
});

router.post("/register", (req, res) => {
  const userInfo = req.body;
  console.log(userInfo, "userInfo");
  const user = new Productions(userInfo);

  user
    .save()
    .then(() => {
      res.send({ result: "Registered Successfully!" });
    })
    .catch((e) => {
      res.send({ message: e.message });
    });
});

router.post("/login", async (req, res) => {
  const userInfo = req.body;
  console.log(userInfo, "userInfo");
  //check email
  const user = await Productions.findOne({ email: userInfo.email });

  if (!user) {
    return res.send({ error: true, message: "Invalid email or password!" });
  }

  //check password
  const matchPassword = user.comparePassword(userInfo.password);

  if (!matchPassword) {
    console.log("password doesn't match");
    return res.send({ error: true, message: "Invalid email or password!" });
  }

  //generate token
  await user.generateToken();
  user.password = null;
  delete user["password"];
  return res.send({ user, message: "Successfully LoggedIn" });
});

router.get("/getUser/:id", (req, res) => {
  var id = req.params.id;
  console.log(id, "id");
  const production = Productions.findOne({ id });

  production
    .then((allProductions) => {
      allProductions.token = null;
      allProductions.password = null;
      res.send({ result: allProductions });
    })
    .catch((e) => {
      res.send({ message: e.message });
    });
});

router.post("/addUser", (req, res) => {
  const user = req.body;
  const newUser = new Productions(user);

  newUser
    .save()
    .then(() => {
      res.send({ message: "User added successfully!" });
    })
    .catch((e) => {
      console.log("e ===>", e);
      res.send({ message: e.message });
    });
});

module.exports = router;
