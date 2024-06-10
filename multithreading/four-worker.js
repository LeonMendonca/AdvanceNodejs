
import { workerData, parentPort } from 'worker_threads'

//workData - data passed to the worker thread during its initialization in the parent thread. In this case, it will be the Fibonacci number to be computed.
let counter = 0;
for (let i = 0; i < 20_000_000_000 / workerData.thread_count ; i++ ) {
    counter++
}

//parentPort - a communication channel with the main/parent thread, allowing the worker thread to send messages back to the parent thread.
parentPort.postMessage(counter);
