const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exists",
        success: false,
      });
    }
     
    const hashedPassword=await bcrypt.hash(password,10);
    const userModel=new UserModel({name,email,password:hashedPassword});
    await userModel.save();
    res.status(201).json({
      message: "Signup Successfull",
      success: true,
    });
  } catch (error) {
     console.log("SIGNUP ERROR:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Authentication failed or password donot match";
    if (!user) {
      return (
        res.status(401).
        json({
          message: errorMsg,
          success: false,
        })
      );
    }

    const issPassEqual = await bcrypt.compare(password, user.password);
    if (!issPassEqual) {
      return (
        res.status(401).
        json({
          message: errorMsg,
          success: false,
        })
      );
    }

    const jwtToken = jwt.sign(
      {
        email: user.email, // This is payload
        _id: user._id, // This is payload
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      message: "Login Succesfully",
      success: true,
      email,
      jwtToken,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
