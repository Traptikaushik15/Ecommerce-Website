const express = require("express");

const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const userDressController = require("./../controllers/userDressController");

const router = express.Router();

router.route("/rented-items").post(userDressController.rentDress);
router.route("/remove-rented-item").post(userDressController.deleteRentedDress);
router
  .route("/display-rented-items")
  .post(userDressController.displayRentedDress);
router.route("/login").post(authController.login);
router.route("/signup").post(authController.signup);
router.route("/logout").get(authController.logout);

module.exports = router;
