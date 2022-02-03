const express=require("express");

const { userCart,userGetCart,removeCart,saveAdress,applyCoupon,createOrder,getOrder } = require("../controllers/userService");
const { authCheck } = require("../middleware/authCheck");
const router=express.Router();


router.post("/user/cart",authCheck,userCart);
router.get("/user/cart",authCheck,userGetCart);
router.delete("/user/cart",authCheck,removeCart);
router.post("/user/address",authCheck,saveAdress);

router.post("/user/cart/coupon",authCheck,applyCoupon);
router.post("/user/order",authCheck,createOrder)
router.get("/user/order",authCheck,getOrder)
module.exports=router;