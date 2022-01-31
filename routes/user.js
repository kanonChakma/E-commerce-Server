const express=require("express");

const { userCart,userGetCart,removeCart,saveAdress,applyCoupon } = require("../controllers/userService");
const { authCheck } = require("../middleware/authCheck");
const router=express.Router();


router.post("/user/cart",authCheck,userCart);
router.get("/user/cart",authCheck,userGetCart);
router.delete("/user/cart",authCheck,removeCart);
router.post("/user/address",authCheck,saveAdress);

router.post("/user/cart/coupon",authCheck,applyCoupon);
module.exports=router;