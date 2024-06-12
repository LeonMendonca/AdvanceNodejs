import { userModel } from '../db/schema.js'

async function signUp(newUserData) {
  try {
    const newUser = await userModel.create(newUserData);
    return newUser;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export { signUp }
