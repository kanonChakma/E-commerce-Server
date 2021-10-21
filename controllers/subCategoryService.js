const subCategory=require('../models/subCategory');
const Slugify=require('slugify');

exports.create =async(req,res)=>{
  const {name,parent}=req.body;
 try{
    const subCreate= await new subCategory({name,parent,slug:Slugify(name)}).save();
    res.json(subCreate);
  }catch(err){
      res.json({status:400,message:err.message});
   }
}

exports.read =async(req,res)=>{
  try{
    const subRead=await subCategory.find({slug:req.params.slug}).exec();
    res.json(subRead);
  }catch(err){
      res.json({status:403,message:"failed to load data"})
   }
}

exports.update =async(req,res)=>{
    try{
        const {name}=req.body;
        const subUpdate=await subCategory.findOneAndUpdate(
            {slug:req.params.slug},
            {name,slug:Slugify(name)},
            {new: true}).exec();

        res.json(subUpdate);
       }catch(err){
           res.json({status:404,message:"failed to update data"});
       }
}

exports.remove =async(req,res)=>{
    try{
     const subRemove=await subCategory.findOneAndDelete({slug:req.params.slug}).exec();
     res.json(subRemove);
    }catch(err){
        res.json({status:404,message:"failed to delete"});
    }
}

exports.list =async(req,res)=>{
  try{
      const subList= await subCategory.find({}).sort({createdAt:-1}).exec();
      res.json(subList);
  }catch(err){
      res.json({status:403,message:"failed to load list"});
    }     
}


