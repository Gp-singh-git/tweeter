/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1620757319000
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1628360519000
//   },
//   {
//     "user": {
//       "name": "Josephk",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@Joseph123"
//     },
//     "content": {
//       "text": "If friendship is your weakest point, you are the strongest person in the world"
//     },
//     "created_at": 1133979719000
//   },
//   {
//     "user": {
//       "name": "Monica",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@MiscMonica"
//     },
//     "content": {
//       "text": "If you really want something, the whole universe starts working to achieve it for you."
//     },
//     "created_at": 1602094919000
//   }
// ];


const createTweetElement = function(data) {
  // console.log("i am in",  data, data["user"], data.user);
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
     <textarea readonly class="oldtweet-text">${escape(data["content"]["text"])}</textarea>
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
  
  for( let entry of data.reverse()) {

    const $post = createTweetElement(entry);
    $('#tweet-containerid').append($post);
  }
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {
// rendertweets(tweetData);

$(`#form-tweet`).submit(function (event) {
  event.preventDefault();
  const check = $("#tweet-text").val();
  if(check.length>140) {
    $(`#error-msg`).slideDown("slow");
  } else if (check.length === 0){
    $(`#error-msg`).text("Please enter some data to post tweet");
    $(`#error-msg`).slideDown("slow");

  } else {
    $(`#error-msg`).hide();

    let newTweetData = $("#tweet-text").serialize();
    // console.log(newTweetData);

    // newTweetData = `<p>${escape(newTweetData)}</p>`;
    // const newTweetData = `<p>${escape($("#tweet-text"))}.serialize()</p>`;
    console.log(newTweetData);
    const url = "/tweets";
    $.ajax({ url: url, method:'POST', data: newTweetData})
      .then(function (data_new) { 
          console.log("successfully posted: ");
          $.ajax({url:url, method:'GET'})
            .then(function(data_new) {
              let obj = data_new[data_new.length - 1];
              const $post = createTweetElement(obj);
              $('#tweet-containerid').prepend($post);
              $('#tweet-text').val('');
          });
        });
  }
});

const loadTweets = function() {
  const url = "/tweets";
  $.ajax({url:url, method:'GET'})
  .then(function(newData) {
    // console.log("New data", newData);
    rendertweets(newData);
  });
}
loadTweets();

});