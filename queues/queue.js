const Queue = require("bull");
const Worker = require("worker_threads");

const emailQueue = new Queue("email-campaigns", {
  redis: {
    host: "127.0.0.1",
    port: 6379
  }
});

emailQueue.process(20, async (job) => {
    // console.log('job', job.data)
    sendEmails(job.data)
})

function sendEmails(job) {
    console.log(`Sending email to with subject ${job.type}`)
    if (job.type == 'tuna') {
        setTimeout(() => {
            console.log(`Sent ${job.type}`);
        }, Math.random(1000) * 5000); // adding random delay to simulate real-world scenario    
    }
    if (job.type == 'shark') {
        setTimeout(() => {
            console.log('Sent ${job.type}');
        }, Math.random(10000) * 5000); // adding random delay to simulate real-world scenario    
    }
}  


module.exports = emailQueue;