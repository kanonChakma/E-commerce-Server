const express=require("express");


const{authCheck,adminCheck}=require("../middleware/authCheck");
const{update,create,listAll,remove,read,list}=require("../controllers/productService");

const router=express.Router();

router.post('/product',authCheck,adminCheck,create);
router.get('/products/:count',listAll);
router.delete('/product/:slug', authCheck,adminCheck,remove);
router.get('/product/:slug',read);
router.put('/product/:slug',authCheck,adminCheck,update);
router.post('/products',list);

module.exports=router;