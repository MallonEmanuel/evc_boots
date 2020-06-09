var cron = require('node-cron');

module.exports = (app, db, bot) => {
    // muesta el listado de tweets generados
    app.get( "/programaciones", (req, res) =>
      db.programacion.findAll().then( (result) => res.json({data :result}) )
    );

    app.post("/programacion", (req, res) => {
      var programacion = db.programacion.build(req.body.programacion);
      programacion.save();
    });

    app.get("/send_tweet", function (req, res) {
      bot.tweet(req.query.text, (err, data, resp) => {
          if (err){
              res.send({status:req.query.text, tweeted:'false', error: err});
          }else{
              db.tweet.create({text: req.query.text , timer: null, publish_date: new Date()});
              res.send({text:req.query.text, tweeted:'true', data : data});
          }
      });
    });


}
