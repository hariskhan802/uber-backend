const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    console.log({'await bcrypt.compare(password, user.password)': await bcrypt.compare(password, user.password)});
    
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).send({ message: "Invalid credentials" });

    const userData = user.toJSON(); 
    delete userData.password;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.send({ token, user: userData });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
