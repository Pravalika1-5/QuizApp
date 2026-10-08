const User = require("../models/User");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../utils/auth");

exports.register = async (req, res) => {
  const { email, password, role, name } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = new User({
      email,
      password: hashedPassword,
      role,
      name,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email, role });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials or role" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({
      token,
      user: { id: user._id, role: user.role, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
