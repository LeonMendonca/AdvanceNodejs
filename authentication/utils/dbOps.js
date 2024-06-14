import { userModel } from '../db/schema.js'

async function signUp(newUserData) {
  try {
    await userModel.create(newUserData);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function Login(userData) {
  try {
    let foundUser = await userModel.findOne({email:userData.email})
    console.log("user found",foundUser)
    if(!foundUser){
      return null;
    }
    const checkpass = await userModel.checkPassword(userData.password,foundUser.password);
    if(!checkpass) {
      return { isValid:false, currentUser:undefined };
    }
    foundUser.set('password',undefined);
    //console.log("db ops",foundUser);
    return  { isValid:true, currentUser:foundUser };
  } catch(error) {
    throw error
  }
}
export { signUp, Login }
