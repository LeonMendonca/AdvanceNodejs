import express from 'express';

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const app = express();

app.get('/',function(req,res) {
  res.send(`${fibonacci(40)},${process.pid}`);
})

app.listen(3000,()=> {
  console.log(`listening at port 3000 ${process.pid}`)
})
