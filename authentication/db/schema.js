import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  username: { type:String, trim:true },
  email: { type:String, unique:true, trim:true },
  password : { type:String },
}, { timestamps : true })


//schema functions must be used before the model
userSchema.pre('save',async function(next){
  const saltRound = 10;
  const signInUser = this;
  if(!signInUser.isModified('password')) { return }
  if(signInUser.username == '') {
    signInUser.username = signInUser.email.split('@')[0];
  }
  try {
    const hashedPass = await bcrypt.hash(signInUser.password,saltRound);
    signInUser.password = hashedPass;
    next();
  } catch (error) {
    next(error)
  }
})

userSchema.static('checkPassword',async function(password,hashPass) {
  try {
    const bool = await bcrypt.compare(password,hashPass);
    return bool;
  } catch(error) {
    throw error;
  }
})

const userModel = model('users',userSchema);

export { userModel };
