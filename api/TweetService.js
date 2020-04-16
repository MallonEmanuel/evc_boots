var cron = require('node-cron');

module.exports = (app, db, bot) => {
    app.get( "/tweet", (req, res) =>
      db.tweet.findAll().then( (result) => res.json(result) )
    );
    
    // Actualiza en estado del usuario
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
                tweet.save();
                task.stop();
            }, {
                scheduled: true,
                timezone : "America/Argentina/Buenos_Aires" 
            });

            res.send({text:req.query.text, registered:'true' ,tweeted:'false', tweet : tweet});                
        }else{
            bot.tweet(req.query.text, (err, data, resp) => {
                if (err){
                    res.send({status:req.query.text, tweeted:'false', error: err});
                }else{
                    // db.tweet.create({text: req.query.text , timer: null, publish_date: new Date()});
                    res.send({text:req.query.text, tweeted:'true', data : data});
                }
            });
        }
        
    }); // end register_tweet


  }