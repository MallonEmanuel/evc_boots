var cron = require('node-cron');
 
console.log('running a task every minute');

cron.schedule('*/2 * * * *', () => {
  var datetime = new Date();
  console.log(datetime);
});

 

//  0 */45 * * * *
// The ranges are here.

// Seconds: 0-59
// Minutes: 0-59
// Hours: 0-23
// Day of Month: 1-31
// Months: 0-11
// Day of Week: 0-6

// Para comprender algo más sobre cronTime, consulte los siguientes códigos:

// cronTime: "00 * / 3 * * * *" => Se ejecuta cada 3 segundos.

// cronTime: "* * / 1 * * * *" => SIGNIFICADO MENOS. Ejecuta cada un segundo.

// cronTime: "00 * / 1 * * * *" => Se ejecuta cada 1 minuto.

// cronTime: "00 30 11 * * 0-5" => Se ejecuta todos los días laborables (de lunes a viernes) a las 11.30 a.m.

// cronTime: "00 56 17 * * *" => Se ejecutará cada 5:56 PM

// https://raw.githubusercontent.com/node-cron/tz-offset/master/generated/offsets.json


// Set time zone
// SELECT * FROM pg_timezone_names where name like '%Buenos%';

// SET TIMEZONE= "America/Argentina/Buenos_Aires";

// select now();

// commit;