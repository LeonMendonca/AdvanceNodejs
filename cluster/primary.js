import cluster from 'node:cluster'
import { availableParallelism } from 'os';
import { resolve } from 'path'

const CPUs = availableParallelism();
const cores = 4;
cluster.setupPrimary({
  exec : resolve('./index.js')
})

console.log("primary id",process.pid)

for (let i=0 ; i<cores ; i++) {
  cluster.fork();
}


cluster.on('exit',(worker) => {
  //this ensures that in any case a cluster crashes, it'll spawn a new cluster
  console.log(`worker ${worker.process.pid} has been killed\nStarting another worker`)
  cluster.fork();
})
