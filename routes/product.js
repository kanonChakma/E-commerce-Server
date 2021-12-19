const express=require("express");


const{authCheck,adminCheck}=require("../middleware/authCheck");
const{create,listAll,remove,read}=require("../controllers/productService");

const router=express.Router();

router.post('/product',authCheck,adminCheck,create);
router.get('/products/:count',listAll);
router.delete('/product/:slug', authCheck,adminCheck,remove);
router.get('/product/:slug',read)

module.exports=router;