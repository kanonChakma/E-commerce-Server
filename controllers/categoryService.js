const Category=require('../models/category');
const Slugify=require('slugify');

exports.create =async(req,res)=>{
  const {name}=req.body;
 try{
    const category= await new Category({name,slug:Slugify(name)}).save();
    res.json(category);
  }catch(err){
      res.json({status:400,message:err.message});
   }
}

exports.read =async(req,res)=>{
  try{
    const category=await Category.find({slug:req.params.slug}).exec();
    res.json(category);
  }catch(err){
      res.json({status:403,message:"failed to load data"})
  }
}

exports.update =async(req,res)=>{
    try{
        const {name}=req.body;
        const category=await Category.findOneAndUpdate(
            {slug:req.params.slug},
            {name,slug:Slugify(name)},
            {new: true}).exec();

        res.json({data:category,message:"update successfull"});
       }catch(err){
           res.json({status:404,message:"failed to update data"});
       }
}

exports.remove =async(req,res)=>{
    try{
     const category=await Category.findOneAndDelete({slug:req.params.slug}).exec();
     res.json(category);
    }catch(err){
        res.json({status:404,message:"failed to delete"});
    }
}

exports.list =async(req,res)=>{
  try{
      console.log("request find brother")
      const category= await Category.find({}).sort({createdAt:-1}).exec();
      res.json(category);
  }catch(err){
      res.json({status:403,message:"failed to load list"});
    }     
}


