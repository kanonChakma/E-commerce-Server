const Product=require("../models/product");
const Slugify=require('slugify');

exports.create= async(req,res)=>{
    try{
     console.log(req.body);
     req.body.slug=Slugify(req.body.title);
     const newProduct= await new Product(req.body).save();
     res.json(newProduct);
     }catch(err){
        res.status(400).json({err:err.message});
     }
 }
 
 exports.listAll= async(req,res)=>{
    try{
        const newProduct= await Product.find({})
        .limit(parseInt(req.params.count))
        .populate("category")
        .populate("subs")
        .sort([["createdAt","desc"]])
        .exec();
        res.json(newProduct);
        }catch(err){
           res.status(400).json({err:err.message});
        }
 }