
var express = require('express');
// https://medium.com/valtech-ch/setup-a-rest-api-with-sequelize-and-express-js-fae06d08c0a7
// var times = require('lodash.times');
// var ramdom = require('lodash.random');
var faker = require('faker');

var db = require('./models');
var port = '3000';
const app = express();

const config = require('./bot_config')
var Bot = require('./bot');
var bot = new Bot(config);

var TweetService = require('./api/TweetService');
var ProgramacionService = require('./api/ProgramacionService');

TweetService(app, db, bot);
ProgramacionService(app, db, bot);


db.sequelize.sync({force:true}).then(() => {
    // populate author table with dummy data
    // db.tuit.bulkCreate(
    //   times(10, () => ({
    //     text: faker.name.firstName(),
    //   }))
    // );
    // populate post table with dummy data
    app.listen(port, () => console.log("App listening on port "+ port));
  });
