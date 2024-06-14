let userEnteredData = {};
let userEnteredDataLogin = {};
let currentUserObj = { 
  user:undefined
};

import { Router } from 'express'

import { InputCheck, resultObj } from '../utils/Inputcheck.js'
import { InputCheckLogin, loginObj } from '../utils/InputCheckLogin.js';
import { signUp, Login } from '../utils/dbOps.js'
import { SetToken } from '../utils/jwt.js';

const reqHandler = Router();

reqHandler.post('/signup',async function(req,res) {
  userEnteredData = req.body;
  const formValidate = InputCheck(req.body,["username"])
  if(!formValidate) {
    return res.redirect(301,'/signup');
  }
  try {
    await signUp(req.body);
  } catch(error) {
    resultObj.result = "Email already taken";
    return res.redirect(301,'/signup');
  }
  res.redirect('/login');
})

reqHandler.post('/login',async function(req,res) {
  userEnteredDataLogin = req.body;
  const formValidate = InputCheckLogin(req.body);
  if(!formValidate) {
    return res.redirect(301,'/login');
  }
  const loginCond = await Login(req.body);
  if(!loginCond) {
    loginObj.result = "User not found";
  } else if (!loginCond.isValid) {
    loginObj.result = "Invalid password";
  } else {
    let token = null;
    if(req.body?.rememberme === 'on') {
        token = SetToken({
        _id:loginCond.currentUser._id,
        email:loginCond.currentUser.email
      })
      res.cookie('uid',token)
    }
    currentUserObj.user = loginCond.currentUser;
    loginObj.result = null;
    userEnteredDataLogin = null;
    return res.redirect('/');
  }
  res.redirect('/login');
})

export { reqHandler, userEnteredData, userEnteredDataLogin, currentUserObj };
