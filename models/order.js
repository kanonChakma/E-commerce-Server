const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

const orderSchema =new mongoose.Schema(
   {
      products:[
          {
             product:{
               type:ObjectId,
               ref:"Product" 
             },
             count:Number,
             color:String,
          },
       ],
     paymentIntents:{},
     orderStatus:{
         type:String,
         default:"No Processed",
         enum:[
             "Not Processed",
             "Processing",
             "Dispatch",
             "Cancelled",
             "Completed",
         ]
     },
     orderedBy:{
         type:ObjectId,
         ref:"User"
      }
   },
   {timestamps:true}
)
module.exports=mongoose.model("Cart", orderSchema);