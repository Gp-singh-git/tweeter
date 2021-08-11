/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1620757319000
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1628360519000
  },
  {
    "user": {
      "name": "Josephk",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@Joseph123"
    },
    "content": {
      "text": "If friendship is your weakest point, you are the strongest person in the world"
    },
    "created_at": 1133979719000
  },
  {
    "user": {
      "name": "Monica",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@MiscMonica"
    },
    "content": {
      "text": "If you really want something, the whole universe starts working to achieve it for you."
    },
    "created_at": 1602094919000
  }
];


const createTweetElement = function(data) {
let $tweet =  `
  <article class="tweet-border">
  <header>
    <div class="pic_name">
     <img src = ${data["user"]["avatars"]}> 
    <label class="name-label">${data["user"]["name"]}</label> 
    </div>
    <div>
    <label class="tweet_handle">${data["user"]["handle"]}</label>
    </div>
  </header>
  <article>
     <textarea readonly class="oldtweet-text">${data["content"]["text"]}</textarea>
  </article>
  <footer>
    <div>
    <label>${timeago.format(data["created_at"])}</label>
    </div>
    <div class="icons_3">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>          
    </div>
  </footer>
</article>
`;
return $tweet;
};

const rendertweets = function(data) {
  for( let entry of data) {
    const $post = createTweetElement(entry);
    $('#tweet-containerid').append($post);
  }

}

$(document).ready(function() {
rendertweets(tweetData);

$(`#form-tweet`).submit(function (event) {
  event.preventDefault();

  const newTweetData = $("#tweet-text").serialize();
  
  const url = "/tweets";
  $.ajax({ url: url, method:'POST', data: newTweetData})
  .then(function (var1) { 
      console.log("successfully posted: ", var1);

    });
});


});