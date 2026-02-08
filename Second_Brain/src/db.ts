import mongoose , {model, Schema}  from "mongoose";
 mongoose.connect("mongodb+srv://himanshuchaurasiya756_db_user:X8tGrvQzy7HSiJTH@cluster0.8rai6bw.mongodb.net/Second_Brain");

  const UserSchema = new Schema ({
    username : { type: String , unique: true},
    password : {type: String}
  });
export const UserModel = model("User" , UserSchema);






