import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    }
    ,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    bio:{
        type:String,
        default:""
    },
    profilePic:{
        type:String,
        default:""
    },
    nativeLanguage:{
        type:String,
        required:true   
    },
    learningLanguages:{
        type:String,
        required:true
    },
    location:{
        type:String,
        default:""
    },
    isOnboard:{
        type:Boolean,
        default:false
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref :"User"
        }
    ]
},{timestamps:true});

const User =  mongoose.model("User",userSchema);

userSchema.pre("save", async function(next)
{
    try {
        const salt = await bcrypt.genSalt(10);
        this.pass = await bcrypt.hash(this.password,salt); //for hashing password

        next()
    } catch (error) {
        
    }
})
export default User;