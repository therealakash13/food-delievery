import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const token = createToken(user._id);
    res.json({ success: true, message: "User Logged In", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Logging In!" });
  }
};

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
};

// Register
const registerUser = async (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;
  try {
    // Check existence of the User
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User Already Exists" });
    }
    // Validating Email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a Valid Email",
      });
    }
    // Validating Password
    if (!validator.isLength(password, { min: 8 })) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }
    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Creating User
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    // Saving User
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, message: "User Created Successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unable to create User" });
  }
};

export { loginUser, registerUser };
