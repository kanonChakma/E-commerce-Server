const Product=require("../models/product");
const Slugify=require('slugify');

exports.create= async(req,res)=>{
    try{
     console.log(req.body);
     req.body.slug=Slugify(req.body.title);
     const newProduct= await new Product({}).save();
     res.json(newProduct)
    }catch(err){
        res.status(400).send("Create product failed"); 
     }
 }