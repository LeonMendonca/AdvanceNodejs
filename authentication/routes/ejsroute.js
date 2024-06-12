import { Router } from 'express'

import { resultObj } from '../utils/Inputcheck.js'
import { userEnteredData } from './reqHandler.js'

const ejsRoute = Router();

ejsRoute.get('/signup',function(req,res) {
  console.log(resultObj)
  res.render('signup',{ result : resultObj.result, userData : userEnteredData })
})

ejsRoute.get('/login',function(req,res) {
  res.render('login')
})

export { ejsRoute }
