const express = require("express");
const {
  loginController,
  addStudentController,
  viewProfileController,
  editController,
  insertUsercontroller
} = require("../controller/controller");
 const Middleware=require("../middleware/auth")
const router = express.Router();

router.post("/",Middleware,insertUsercontroller)
router.post("/loginform", loginController)
router.get("/viewprofile",viewProfileController);
router.put("/updateprofile",Middleware, editController);

module.exports = router;
