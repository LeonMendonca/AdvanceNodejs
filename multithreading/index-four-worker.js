
import express from 'express'
import { Worker } from 'worker_threads'

const app = express()

const port = process.env.PORT || 3000
const thread_count = 8;

app.get('/non-blocking',function(req,res) {
  res.send("non blocking page")
})

function createWorker() {
  return new Promise((resolve,reject) => {
    const worker = new Worker('./four-worker.js', {
      workerData:{thread_count:thread_count}
    })
    worker.on('message',(data) => {
      resolve(data);
    })
    worker.on('error',(error) => {
      reject(error)
    })

  })
}

app.get('/blocking',async function(req,res) {
  const worker = new Worker("./worker.js")
    const workerPromises = [];
    for (let i = 0; i < thread_count ; i++) {
      workerPromises.push(createWorker())
    }
    const thread_results = await Promise.all(workerPromises);
    thread_results.forEach(function(eachThread) {
      console.log("each thread",eachThread)
    })
    const total = thread_results[0] + thread_results[1] + thread_results[2] + 
    thread_results[3] + thread_results[4] + thread_results[5] + thread_results[6] + thread_results[7];
    console.log(total)
    res.status(200).send(`result is ${total}`)
  })

app.listen(port,()=> {
  console.log("listening to port",port)
})
