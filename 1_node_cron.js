var cron = require('node-cron');
 
console.log('running a task every minute');

cron.schedule('* * * * *', () => {
  var datetime = new Date();
  console.log(datetime);
});

