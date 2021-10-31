const express=require("express");


const{authCheck,adminCheck}=require("../middleware/authCheck");
const{create,listAll}=require("../controllers/productService")

const router=express.Router();

router.post('/product',authCheck,adminCheck,create);
router.get('/products/:count',listAll);

module.exports=router;