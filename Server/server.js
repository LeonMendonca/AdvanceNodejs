import express from 'express'
import { Worker } from 'worker_threads'

const app = express();

function createWorker() {
  const worker = new Worker('./worker.js')
  return new Promise((resolve,reject) => {
    worker.on('message', (data) => {
      resolve(data);
    })
    worker.on('error', (error) => {
      reject(error);
    })
  }); 
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}


app.get("/",async function (req,res) {
  console.log("you called..");
  const result = await createWorker()
  //const result = fibonacci(40);
  console.log("got req");
  res.json({value:result});
})

app.listen(3000,()=> {
  console.log("listening to port 3000");
})
