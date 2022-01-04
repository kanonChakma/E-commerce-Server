const Product=require("../models/product");
const Slugify=require('slugify');
const { default: slugify } = require("slugify");

exports.create= async(req,res)=>{
    try{
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

 exports.remove=async(req,res)=>{
  try{
      const deleted=await Product.findOneAndRemove({
         slug:req.params.slug
      }).exec();
      res.json(deleted);
   }catch(err){
      console.log(err);
      return res.status(400).send("Product deleted failed");
     }
 }

 exports.read=async(req,res)=>{
     let product= await Product.findOne({slug:req.params.slug})
    .populate('category')
    .populate('subs')
    .exec();
    res.json(product)
 }

 exports.update=async(req,res)=>{
   try{
      //it will update slug
      // if(req.body.title){
      //    req.body.slug=Slugify(req.body.title);
      // }
      const updated=await Product.findOneAndUpdate(
         {slug:req.body.slug},
          req.body,
         {new:true}  //For returning updated data
      ).exec();
      res.json(updated);
   }catch(err){
      res.status(400).json({
         err:err.message,
      })
   }
}

exports.list=async(req,res)=>{
   try{
      const {sort,order,limit}=req.body;
      const products=await Product.find({})
      .populate('category')
      .populate('subs')
      .sort([[sort,order]])
      .limit(limit)
      .exec()

      res.json(products);

   }catch(err){
     console.log(err);
   }
}



