const { firestore } = require('firebase-admin');
const admin=require('../firebase');
exports.authCheck=async (req,res,next)=>{ 
   try{
       const firebaseUser=await admin.auth().verifyIdToken(req.headers.authtoken);
      //console.log("this is firebase",firebaseUser);
       req.user=firebaseUser;
       next();
   }catch(err){
     res.status(401).json({err:"invalid or expired token"})
    //  console.log("error are occuring",err);
   }    
};