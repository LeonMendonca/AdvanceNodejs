import express from 'express';
import cluster from 'node:cluster';
import { availableParallelism } from 'os';

const totalCpus = availableParallelism();

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

if(cluster.isPrimary) {
  for (let i=0 ; i < totalCpus ; i++){
    cluster.fork();
  }
} else {
  const app = express();

  app.get('/',function(req,res) {
    res.send(`${fibonacci(40)},${process.pid}`);
  })

  app.listen(3000,()=> {
    console.log("listening")
  })
}
