import { Worker } from 'worker_threads'

const threadPerWork = 4;

function createWorker() {
  const data = new Promise((resolve,reject) => {
    const worker = new Worker('./workerIterate.js',{ workerData:{threadPerWork:threadPerWork } });
      worker.on('message',(data)=> {
      resolve(data);
    })
    worker.on('error',(error) => {
      reject(error);
    })
  })
  return data;
}


let array = [];
function Iterate() {
  try {
    for (let i=0 ; i<threadPerWork ; i++) {
      array.push(createWorker())
    }
  } catch(error) {
    console.log(error)
  }
}

Iterate()
Iterate()
const arrofval = await Promise.all(array)
let sum = 0;
arrofval.forEach(function(val) {
  sum = sum+val;
})
console.log(sum,"iterations")
