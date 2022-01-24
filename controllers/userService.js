const Product=require("../models/product");
const User=require("../models/user");
const Cart=require("../models/cart");

exports.saveAdress=async(req,res)=>{
 try{
   const {address}= req.body;
   const user=await User.findOneAndUpdate({email:req.user.email},{address}).exec()
   res.json({ok:true});
 }catch(err){
  res.json({err})
  }
}

exports.removeCart=async(req,res)=>{
   const user=await User.findOne({email:req.user.email})
   const cart=await Cart.findOneAndRemove({orderedBy:user._id}).exec()
   res.json(cart);
}

exports.userGetCart=async(req,res)=>{
 const user=await User.findOne({email:req.user.email})
 const cart=await Cart.findOne({orderedBy:user._id}).populate('products.product').exec();
  const{products,totalAfterDiscount,cartTotal}=cart;
  res.json({products,totalAfterDiscount,cartTotal})                
}

exports.userCart=async(req,res)=>{
   let {cart}=req.body;
   let products=[];

  const user= await User.findOne({email:req.user.email}).exec();
  const cartExistUser= await  Cart.findOne({orderedBy:user._id}).exec();
  
  if(cartExistUser){
     cartExistUser.remove();
  } 
  
  for (let i = 0; i < cart.length; i++) {
      let data={};
       data.product=cart[i]._id;
       data.count=cart[i].count;
       data.color=cart[i].color;
       data.title=cart[i].title;
       let {price}=await Product.findById(cart[i]._id).select("price").exec();
       data.price=price;
       products.push(data);
    }
    
    let cartTotal=0;
   for (let i = 0; i < products.length; i++) {
     cartTotal=cartTotal+products[i].count*products[i].price;  
   }

   let newCart=await new Cart({
      products,
      cartTotal,
      orderedBy:user._id,
   }).save();
   res.json({ok:"true"});
}