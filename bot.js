const config = require('./config')
const twit = require('twit')
const T = new twit(config)

// https://www.npmjs.com/package/twit
function retweet() {
    let params = {
      q: '#CopaAmérica2020',
      count: 1
    }
    T.get('search/tweets', params, (err, data, response) => {
      let tweets = data.statuses

      if (!err) {
        for (let dat of tweets) {
          let retweetId = dat.id_str;
          // console.log(retweetId);
          postTweet(retweetId);
          console.log(dat);
        }
      }
    })
} // end retweet


function postTweet(retweetId){
    T.post('statuses/retweet/:id', {
      id: retweetId
    }, (err, response) => {
      if (response)
        console.log('Retweeted!!! ' + retweetId)
      if (err)
        console.log('Something went wrong while RETWEETING... Duplication maybe...')
    }); // end post
}

// Parametros publicos para buscar mis amigos
var me = {
    user_id: null,
    screen_name: 'emanuelsm18',
    count: 100

}
var ema = {
    user_id: null,
    screen_name: 'Emanuel41243617',
    count: 100
}
// Obtiene los amigos de alguien dependiendo de los parametros de entrada
function getFriends(params) {
    T.get('friends/list', params, (err, data, response) => {
      if (!err) {
          console.log(data);
      }else {
          console.log(err);
      }
    });
} // end retweet

function getFollowers(params) {
    // ids, list
    T.get('followers/list', params, (err, data, response) => {
      let followers = data;
      if (!err) {
          console.log(followers);
      }else {
          console.log(err);
      }
    });
} // end retweet

// getFollowers(me);

//getFriends(me);
// setInterval(retweet, 10000)

// otra Twitter : Emanuel41243617/eurocase    id : 1229564542566457300
// https://twitter.com/Emanuel41243617/status/1229854201255206917

function getLookup(params) {
    // ids, list
    T.get('users/lookup', params, (err, data, response) => {
      let followers = data;
      if (!err) {
          console.log(followers);
      }else {
          console.log(err);
      }
    });
} // end retweet

//getLookup(ema);

// Permite realizar un posteo
function tweet(params) {
    // ids, list
    T.post('statuses/update', params, (err, data, response) => {
      let followers = data;
      if (!err) {
          console.log(followers);
      }else {
          console.log(err);
      }
    });
} // end retweet

//tweet({status:'Prueba 2',display_coordinates:true});

//postTweet('1229854201255206917');


function search(palabra){
  let params = {
    q: palabra,
    // count: 1
  }
  T.get('search/tweets', params, (err, data, response) => {
    let tweets = data.statuses
    if (!err) {
      console.log(data);
    }
  })
}

search('Coronavirus');
