import { parentPort, workerData } from 'worker_threads'

function Iterate() {
  let count = 0;
  for (let i = 0; i < 20_000_000_000 / workerData.threadPerWork ; i++) {
    count++
  }
  return count
}

parentPort.postMessage(Iterate())
