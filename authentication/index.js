import express from 'express';
import { resolve } from 'path';
import cookieParser from 'cookie-parser';

import { ejsRoute } from './routes/ejsroute.js';
import { reqHandler } from './routes/reqHandler.js';
import { mongoDbConn } from './db/mongoDbConn.js';
import { validateToken } from './utils/validateLogin.js';

const port = process.env.PORT || 3000;

const app = express();

app.set('views',resolve('./views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(validateToken);
app.use('/',ejsRoute);
app.use('/',reqHandler);

try {
  await mongoDbConn();
  app.listen(port, async ()=> {
    console.log(`listening to port ${port}\nconnected to Db`);
  })
} catch(error) {
  console.log(error.message);
}
