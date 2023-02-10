const Queue = require("bull");
const CustomerGroup = require("../constants/cGroups");
const CONCURRENT_WORKERS_NUMBER = process.env.CONCURRENT_WORKERS_NUMBER;
const emailQueue = new Queue("email-campaigns", {
    redis: {
        host: process.env.REDIS_HOST,
        port: 6379
    }
});

//Start 20 workers listening to queue
emailQueue.process(CONCURRENT_WORKERS_NUMBER, async (job) => {
    //log the process status
    sendEmails(job.data)
})

function sendEmails(job) {
    console.log(`Sending email to ${job.group} subscribers`)
    if (job.group == CustomerGroup.TUNA) {
        setTimeout(() => {
            console.log(`Sent ${CustomerGroup.TUNA}`);
        }, 10000); // adding random delay to simulate real-world scenario    
    }
    else if (job.group == CustomerGroup.SHARK) {
        setTimeout(() => {
            console.log(`Sent emails to${CustomerGroup.SHARK} subscribers`);
        }, 100000);
    }
    else {
        setTimeout(() => {
            console.log(`Sent ${CustomerGroup.WHALE} subscribers`);
        }, 1000000);
    }
}

module.exports = emailQueue;