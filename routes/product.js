const express=require("express");


const{authCheck,adminCheck}=require("../middleware/authCheck");
const{create}=require("../controllers/productService")

const router=express.Router();

router.post('/product',authCheck,adminCheck,create);
module.exports=router;