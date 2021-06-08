const express=require("express");

const { userInfo } = require("../controllers/userService");
const router=express.Router();

router.get("/user",userInfo);
module.exports=router;