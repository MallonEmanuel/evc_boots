var cron = require('node-cron');

module.exports = (app, db, bot) => {
    // muesta el listado de tweets generados
    app.get( "/tweets", (req, res) =>
      db.tweet.findAll().then( (result) => res.json({data :result}) )
    );

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

    // Programa un Tweet a ser publicado.
    app.get('/register_tweet', function (req, res) {
        // Si timer no es null, se agenda la publicacion. La cual sera tratata por otro servicio
        if (req.query.timer != null || req.query.timer != undefined){
            // Se crea un tweet
            var tweet = {text: req.query.text
                        ,timer: req.query.timer
                        ,publish_date: null};
            // Se guarda el tweet en la base de datos
            tweet = db.tweet.build(tweet);
            tweet.save();
            // console.log(tweet);
            // Registra la tarea que luego sera ejecutada (se realizara el tweet)
            var task = cron.schedule(req.query.timer, () =>  {
                tweet.publish_date = new Date();
                tweet.save(); // se guarda la información de tweeteo
                task.stop(); // Se para la tarea
            }, {
                scheduled: true,
                timezone : "America/Argentina/Buenos_Aires"
            });// fin Task
            // envia la respuesta al cliente.
            res.send({text:req.query.text, registered:'true' ,tweeted:'false', tweet : tweet});
        }else{
            res.send({text:req.query.text, registered:'false' ,tweeted:'false', tweet : null
                     ,error : 'Por favor agregue un timer para realizar el tweet'});
        }
    }); // end register_tweet


  }
