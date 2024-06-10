import { Worker } from 'worker_threads'
import express from 'express'
import { ConnRedis } from './redisCon.js'
import logger from 'morgan'

const app = express()
const redis = await ConnRedis();

app.use(logger("dev"));

function chunkify(array, n) {
  let chunks = [];
  for(let i=n ; i>0; i--) {
    //from index 0, delete n elements and return
    chunks.push(array.splice(0,Math.ceil(array.length/i)))
  }
  return chunks
}

function createWorker(arrEachThread,searchUser) {
  const data = new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js',{ workerData:{ arr:arrEachThread, search:searchUser } })
    worker.on('message',(data) => {
      resolve(data)
    })
    worker.on('error',(error) => {
      reject(error)
    })
  })
  //console.log(data);
  return data;
}

app.get('/:name',async function(req,res) {
  try {
    let result = null
    let promises = [];
    const searchuser = parseInt(req.params.name)
    let arr = await redis.call('json.get','users');
    arr = JSON.parse(arr);
    const chunksOfarr = chunkify(arr,4);
    for (let i = 0; i<chunksOfarr.length ; i++) {
      promises.push(createWorker(chunksOfarr[i],searchuser));
    }
    result = await Promise.all(promises);
    for (let val of result) {
      if(val) { result = val }
    }
    return res.send(`welcome ${result.username},${result.email}`);
  } catch (error) {
    console.log(error.message);
  }
  res.status(404).send("user not found");
})

app.listen(3000,()=> {
  console.log("listening")
})
