import { Worker } from 'worker_threads'


function doFib(num) {
  try {
    const worker = new Worker('./worker.js',{workerData:{number:num}})
    const data = new Promise((resolve,reject) => {
      worker.on('message',(data) => {
        resolve(data)
        console.log("returning promise",data)
      })
      worker.on('error',(err) => {
        reject(err)
      })
    })
    return data
  } catch(err) {
    console.log(err.message)
  }

}
let val = await Promise.all([doFib(40),doFib(40),doFib(40),doFib(40),doFib(40),doFib(40)]);
console.log(val)
