import { parentPort , workerData } from 'worker_threads'

let founduser = null;
for (let user of workerData.arr) {
  if(user.username === workerData.search) {
    console.log(user.username);
    founduser = user
    break;
  }
}
parentPort.postMessage(founduser)
