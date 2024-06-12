let userEnteredData = {};

import { Router } from 'express'

import { InputCheck, resultObj } from '../utils/Inputcheck.js'
import { signUp } from '../utils/dbOps.js'


const reqHandler = Router();

reqHandler.post('/signup',async function(req,res) {
  const formValidate = InputCheck(req.body,["username"])
  userEnteredData = req.body;
  if(!formValidate) {
    return res.redirect(301,'/signup');
  }
  try {
    const createdUser = await signUp(req.body);
    console.log(createdUser);
  } catch(error) {
    resultObj.result = "Email already taken";
    return res.redirect(301,'/signup');
  }
  res.redirect('/login');
})

reqHandler.post('/login',async function(req,res) {
  res.send(req.body);
})
export { reqHandler, userEnteredData };
