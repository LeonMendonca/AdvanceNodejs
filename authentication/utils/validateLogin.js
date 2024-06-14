import { GetPayload } from './jwt.js';
import { userModel } from '../db/schema.js';
import { currentUserObj } from '../routes/reqHandler.js';

async function validateToken(req, res, next) {
  try {
    // Exclude specific routes from validation
    let excludedPaths = ['/login', '/signup']; //routes that should not require authentication
    console.log(excludedPaths);
    if (excludedPaths.includes(req.path)) {
      console.log("path in validatetoken",req.path);
      return next();
    }

    if(currentUserObj.user) {
      return next();
    }
    const payload = GetPayload(req.cookies.uid);
    if (payload) {
      const userDetail = await userModel.findOne({_id:payload._id});
      userDetail.set('password',undefined);
      currentUserObj.user = userDetail;
      return next();
    }
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error'); // Handle errors gracefully
  }
}

export { validateToken };

