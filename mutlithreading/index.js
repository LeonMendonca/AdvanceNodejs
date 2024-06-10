import express from 'express'
import { Worker } from 'worker_threads'

const app = express()

const port = process.env.PORT || 3000
//const fib = 40;

app.get('/non-blocking',function(req,res) {
  res.send("non blocking page")
})

function createWorker() {
}


app.get('/blocking/:num',async function(req,res) {
  try {
    const num = parseInt(req.params.num)
    const worker = new Worker("./worker.js", { workerData: {fibnum:num} })

    const data = await new Promise((resolve, reject)=>{
      worker.on('message',(data) => {
        console.log(resolve(data));
      })
      worker.on('error',(error) => {
        reject(error)
      })
      console.log(worker.threadId)
    })
    res.status(200).send(`result is ${data}`)
  } catch(error){
    res.status(500).send(error.message)
    console.log(error.message)
  }
})
  

app.listen(port,()=> {
  console.log("listening to port",port)
})
