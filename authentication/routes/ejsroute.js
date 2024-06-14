import { Router } from 'express'

import { resultObj } from '../utils/Inputcheck.js'
import { loginObj } from '../utils/InputCheckLogin.js'
import { userEnteredData , userEnteredDataLogin, currentUserObj } from './reqHandler.js'

const ejsRoute = Router();

ejsRoute.get('/',function(req,res) {
  res.render('index',{ user : currentUserObj.user})
})

ejsRoute.get('/signup',function(req,res) {
  res.render('signup',{ result : resultObj.result, userData : userEnteredData })
})

ejsRoute.get('/login',function(req,res) {
  res.render('login',{ result : loginObj.result, userData : userEnteredDataLogin})
})

ejsRoute.use('/logout',function(req,res,next) {
  currentUserObj.user = undefined;
  res.redirect('/'); 
})

export { ejsRoute }
