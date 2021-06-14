const express=require("express");

//import controllers
const { createOrUpdateuser,currentUser } = require("../controllers/authService");

//import middleware
const { authCheck } = require("../middleware/authCheck");

//import router
const router=express.Router();

router.post("/create-or-update-user",authCheck,createOrUpdateuser);
router.post("/current-user",authCheck,currentUser)
module.exports=router;
