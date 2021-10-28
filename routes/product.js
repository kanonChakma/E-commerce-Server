const express=require("express");


const{authCheck,adminCheck}=require("../middleware/authCheck");
const{create,read}=require("../controllers/productService")

const router=express.Router();

router.post('/product',authCheck,adminCheck,create);
router.get('/products',read);
module.exports=router;