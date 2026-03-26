const User = require("./../models/userModel");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) throw "no user";

    if (user.password !== req.body.password)
      throw "User credentials not matched";

    res.cookie("user", user.username, {
      expires: new Date(Date.now() + 1000 * 36000),
      httpOnly: false,
      sameSite: "Lax",
      path: "/",
    });

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
      displayFrontend: "User already exists!",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("user", "loggedout", {
      httpOnly: false,
      expires: new Date(0),
    });

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Error during logout",
    });
  }
};
