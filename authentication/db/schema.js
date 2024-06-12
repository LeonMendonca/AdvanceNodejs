import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  username: { type:String, trim:true },
  email: { type:String, unique:true, trim:true },
  password : { type:String },
  rememberme : { type:String, default:'off' },
}, { timestamps : true })


//schema fucntions must be used before the model
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

userSchema.static('checkPassword',async function() {
})

const userModel = model('users',userSchema);

export { userModel };
