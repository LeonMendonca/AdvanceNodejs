import express from 'express'
import { resolve } from 'path'

const app = express();

app.set('views',resolve('./views'))
app.set('view engine', 'ejs')

app.get('/',function(req,res) {
  res.render('login')
})

app.listen(3000, ()=> {
  console.log('listening')
})
