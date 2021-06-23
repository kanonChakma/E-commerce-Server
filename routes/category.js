const express=require("express");

const { authCheck,adminCheck } = require("../middleware/authCheck");

const { create,read,list,update,remove} = require("../controllers/categoryService");

const router=express.Router();

router.get('/categories',list);
router.post('/category',authCheck,adminCheck,create);
router.get('/category/:slug',read);
router.put('/category/:slug',authCheck,adminCheck,update);
router.delete('/category/:slug',authCheck,adminCheck,remove);

module.exports=router;