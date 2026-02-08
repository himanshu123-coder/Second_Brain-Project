import mongoose , {model, Schema}  from "mongoose";
 mongoose.connect("mongodb+srv://himanshuchaurasiya756_db_user:X8tGrvQzy7HSiJTH@cluster0.8rai6bw.mongodb.net/Second_Brain");

  const UserSchema = new Schema ({
    username : { type: String , unique: true},
    password : {type: String}
  });
export const UserModel = model("User" , UserSchema);

  const ContentSchema = new Schema({
    title : String,
    link : String,
    type: String,
    tags : [{ type: mongoose.Types.ObjectId,ref: "tag"}],
    userId: [{
        type: mongoose.Types.ObjectId,
        ref : "User",
        required : true
    }],

  });
export const ContentModel = model("Content", ContentSchema);

  const LinkSchema = new Schema({
    hash : String,

   userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
    
  });
export const LinkModel = model("Links", LinkSchema);
