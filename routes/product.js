const express=require("express");


const{authCheck,adminCheck}=require("../middleware/authCheck");
const{create,listAll,remove}=require("../controllers/productService");

const router=express.Router();

router.post('/product',authCheck,adminCheck,create);
router.get('/products/:count',listAll);
router.get('/products/:slug', authCheck,adminCheck,remove);

module.exports=router;