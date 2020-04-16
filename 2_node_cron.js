var cron = require('node-cron');
 
var task = cron.schedule('* * * * * *', () =>  {
  console.log('stoped init');
  task.stop();
  console.log('stoped task');
  
}, {
  scheduled: true
});
 
