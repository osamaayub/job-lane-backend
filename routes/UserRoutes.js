const express = require('express');
const {
  register,
  login,
  isLogin,
  me,
  changePassword,
  updateProfile,
  deleteAccount 
} = require('../controllers/UserControllers')
const upload = require("../utils/multer");
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router()

router
  .route("/register")
  .post(
    upload.fields([
      { name: "avatar", maxCount: 1 },
      { name: "resume", maxCount: 1 },
    ]),
    register
  );



router.route("/login").post(login);
router.route("/isLogin").get(isAuthenticated, isLogin);
router.route("/me").get(isAuthenticated, me);
router.route("/changePassword").put(isAuthenticated, changePassword);
router.route("/updateProfile")
  .put(
    isAuthenticated,
    upload.fields([
      { name: "newAvatar", maxCount: 1 },
      { name: "newResume", maxCount: 1 }
    ]),
    updateProfile
  );

router.route("/deleteAccount").delete(isAuthenticated, deleteAccount);



module.exports = router
