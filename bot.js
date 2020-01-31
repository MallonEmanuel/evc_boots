const config = require('./config')
const twit = require('twit')
const T = new twit(config)

// https://www.npmjs.com/package/twit
function retweet() {
    let params = {
      q: '#CopaAmérica2020',
      count: 10
    }
    T.get('search/tweets', params, (err, data, response) => {
      let tweets = data.statuses

      if (!err) {
        for (let dat of tweets) {
          let retweetId = dat.id_str;
          // console.log(retweetId);
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
// Obtiene los amigos de alguien dependiendo de los parametros de entrada
function getFriends(params) {
    T.get('friends/ids', params, (err, data, response) => {
      let friends = data.ids;
      if (!err) {
          console.log(friends);
      }else {
          console.log(err);
      }
    });
} // end retweet

getFriends(me);
// setInterval(retweet, 10000)
