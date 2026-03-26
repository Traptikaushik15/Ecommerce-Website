const User = require("./../models/userModel");

exports.rentDress = async (req, res) => {
  try {
    const { username, item } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    if (user.rentedItem.includes(item)) {
      return res.status(400).json({
        status: "fail",
        message: "Item is already rented",
      });
    }

    user.rentedItem.push(item);
    console.log(user);
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Item rented successfully",
      rentedItems: user.rentedItem,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

exports.displayRentedDress = async (req, res) => {
  try {
    const { user } = req.body;

    const foundUser = await User.findOne({ username: user });

    if (!foundUser) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      rentedItems: foundUser.rentedItem,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
    });
  }
};

exports.deleteRentedDress = async (req, res) => {
  try {
    const { user, item } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { username: user },
      { $pull: { rentedItem: item } },
      { new: true }
    );
    console.log(updatedUser);
    if (!updatedUser) {
      return res.status(404).json({
        status: "fail",
        message: "User not found or item not in rented list",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Item removed successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Error removing item from rented list",
      error: err.message,
    });
  }
};
