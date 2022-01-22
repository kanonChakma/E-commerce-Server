const express=require("express");

const { userCart } = require("../controllers/userService");
const { authCheck } = require("../middleware/authCheck");
const router=express.Router();


router.post("/user/cart",authCheck,userCart)
module.exports=router;