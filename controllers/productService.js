const Product=require("../models/product");
const User= require("../models/user");

const Slugify=require('slugify');
const { default: slugify } = require("slugify");
const product = require("../models/product");

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

//-------------WITH OUT PAGINATION-------
// exports.list=async(req,res)=>{
//    try{
//       const {sort,order,limit}=req.body;
//       const products=await Product.find({})
//       .populate('category')
//       .populate('subs')
//       .sort([[sort,order]])
//       .limit(limit)
//       .exec()
//       res.json(products);
//    }catch(err){
//      console.log(err);
//    }
// }

//---------WITH PAGINATION-------
exports.list=async(req,res)=>{
   try{
       console.log(req.body)
      const {sort,order,page}=req.body;
      const currentPage= page|| 1;
      const perPage=3;

      const products=await Product.find({})
      .skip((currentPage-1)*perPage)
      .populate('category')
      .populate('subs')
      .sort([[sort,order]])
      .limit(perPage)
      .exec()
      res.json(products);
   }catch(err){
     console.table(err);
   }
}

exports.totalProduct=async(req,res)=>{
  try{
     const total=await Product.find({})
     .estimatedDocumentCount()
     .exec()
     res.json(total);
  }catch(err){
     console.log(err)
   }
}

exports.productRating=async(req,res)=>{     
    
  try{
       const product=Product.findById(req.params.productId)
       const user=User.findOne({email:req.user})
       const {star}=req.body;

       const matchRatting=product.ratings.find((r)=>(
          r.postedBy.toString() === user._id.toString()
       ))
       if(matchRatting === undefined){
            const addRating=Product.findByIdAndUpdate(
               product._id,
             {
                $push: { ratings:{star,postedBy:user._id}}
              },
            {new:true}  
            ).exec();
            res.json(addRating);
       }else{
         const updateRatting=Product.updateOne(
            {
               ratings:{$element:matchRatting},
            },
            {
             $set:{"ratings.$.star":star}
            }
         ).exec() 
         res.json(updateRatting)    
       }
  }catch(err){
    console.log(err);
   }
}
