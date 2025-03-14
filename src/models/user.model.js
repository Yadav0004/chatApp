 import  mongoose   from   'mongoose'
   const  userSchema= new  mongoose.Schema(
    //  in th is  have  information   what  the  particular things  is requride   for the  user   log  in   and   singnup 
    {
        email:{
            type:String,
            require:true,
            unique:true,
            lowercase:true,

        },
        fullName:{
            type:String,
            require:true,
        },
        password:{
            type:String,
            require:true,
            minlenght:6,
        },
        profilePic:{
            type:String,
            require:true,
            default:"", 
        },

    }
    , {timestamps:true}
    //  timestamps ka use Mongoose schema mein document ke liye createdAt aur updatedAt fields automatically add karne ke liye hota hai
    // createdAt:Jab bhi koi naya document create hota hai, createdAt field uska creation time store karti hai,
    // updatedAt :aur jab bhi document update hota hai, updatedAt field automatically update ho jati hai. I

   );
// User   define  capital  letter becuse  mongoose is  follow PascalCase  it is  good  practice  this is JavaScript convention 
//   if not  then your  data  and   key  vlaue look like same  wihich  is  not  good  practice 
    const User=mongoose.model("User",userSchema)
     export default User;
    // now setup in auth  controller 

   