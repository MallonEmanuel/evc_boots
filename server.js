const Sequelize = require('sequelize');
// Api Twitter
const config = require('./config')
const twit = require('twit')
const T = new twit(config) // conexion a Twitter
// Requerimientos express
var express = require('express');
var app = express();

// Servidor de prueba de conexion a base de datos

// Option 1: Passing parameters separately
const sequelize = new Sequelize('evc-db', 'evc-user', '12345678', {
  host: 'localhost',
  dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

const Model = Sequelize.Model;

class User extends Model {}
User.init({
  // attributes
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  apellido: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
}, {
  sequelize,
  modelName: 'usuario'
  // options
});

class Resultado extends Model {}
Resultado.init({
  // attributes
   id_str       : { type: Sequelize.STRING }
  ,url          : { type: Sequelize.STRING }
  ,busqueda     : { type: Sequelize.STRING }
  ,text         : { type: Sequelize.STRING }
  ,user_id      : { type: Sequelize.STRING }
  ,user_id_str  : { type: Sequelize.STRING }
  ,user_name    : { type: Sequelize.STRING }
  ,geo          : { type: Sequelize.STRING }
  ,coordinates  : { type: Sequelize.STRING }
  ,place        : { type: Sequelize.TEXT }
}, {
  sequelize,
  modelName: 'resultado'
  // options
});

// Resultado.sync({ force: true }).then(() => {
//   // Now the `users` table in the database corresponds to the model definition
//   // return User.create({
//   //   nombre: 'John',
//   //   apellido: 'Hancock'
//   // });
//   console.log('Tabla Resultado creada');
// });
//
// function search_tweets(params, todo, res){
//   T.get('search/tweets', params, (err, data, response) => {
//     if (err) {
//       console.error('Error al intentar buscar en Twitter : '+ err);
//     }else{
//       todo(params, data, res);
//     }
//   });
// }

function save_resultado(params, data, res){
  // console.log(data);
  var resultado = null;
  var resultados = [];
  for (let status of data.statuses) {
       resultado = {
       id_str: status.id_str
      ,url: params.url
      ,busqueda: params.q
      ,text: status.text
      ,user_id: null
      ,user_id_str: status.user.id_str
      ,user_name: status.user.name
      ,geo: status.geo
      ,coordinates: status.coordinates
      ,place: status.place
       };
      Resultado.create(resultado);
      resultados.push(resultado);
  }
  res.send(resultados);
}

app.get('/agregar_usuario', function (req, res) {
  res.send('Agregando : '+ req.query.nombre + ' '+ req.query.apellido);
});
var Bot = require('./bot');
var bot = new Bot(config);

app.get('/buscar', function (req, res) {
  // res.send('Buscando : '+ req.query.q ) ;
  var palabra = '', url = '';
  if (req.query.hastag == 'S'){
    palabra = '#';
  }
  palabra = palabra + req.query.q;
  url = '/buscar?q=' + palabra ;
  if (req.query.geocode != null && req.query.geocode != undefined){
    url += '&geocode=' + req.query.geocode;
  }
  let params = {
     q       : palabra //+ ' geocode:-42.7667,-65.05,5km'
    ,url     : url
    ,geocode : req.query.geocode
    ,count   : 10
  }
  console.log(params);
  bot.search_tweets(params, save_resultado, res);

});
// Actualiza en estado del usuario
app.get('/tweet', function (req, res) {
  bot.tweet(req.query.status, (err, data, resp) => {
    if (err){
      res.send({status:req.query.status, tweeted:'false', error: err});
    }else{
      res.send({status:req.query.status, tweeted:'true', data : data});
    }

  });
}); // end tweet
// 1247534063184777200

app.get('/retweet', function (req, res) {
  bot.retweet(req.query.tweet_id, (err, data, resp) => {
    if (err){
      res.send({tweet_id: req.query.tweet_id, retweeted:'false', error: err});
    }else{
      res.send({tweet_id: req.query.tweet_id, retweeted:'true', data : data});
    }

  });
}); // end retweet

app.get('/lookup', function (req, res) {
  bot.lookup(req.query.tweet_id, (err, data, resp) => {
    if (err){
      res.send({tweet_id: req.query.tweet_id, error: err});
    }else{
      res.send({tweet_id: req.query.tweet_id, data : data});
    }

  });
}); // end retweet

//
// // debemos dejar este pedazo de codigo de lado por el momento
// app.get('/resultados', function (req, res) {
//   // res.send('Buscando : '+ req.query.q ) ;
//   var palabra = '';
//   if (req.query.hastag == 'S'){
//     palabra = '#';
//   }
//   palabra = palabra + req.query.q;
//   if (req.query.geocode != null && req.query.geocode != undefined){
//     // palabra = palabra +'&geocode='+ req.query.geocode;
//
//   }
//   console.log(palabra);
//   Resultado.findAll({where: { busqueda: palabra}})
//                      .then(function (resultados){
//                         // console.log(resultados);
//                         res.send(resultados);
//                       });
// });


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
