const { Worker, isMainThread, parentPort } = require('worker_threads');

if (!isMainThread) {
    parentPort.on('message', async (emailChunk) => {
      const { campaign } = job;
      await sendEmails(emails);
    });
}


  