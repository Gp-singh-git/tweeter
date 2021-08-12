/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// 

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
    $(`#error-msg`).text("Please dont Exceed the 140 character limit");
    $(`#error-msg`).append(`<i class="fas fa-exclamation-circle"></i> `);
    $(`#error-msg`).slideDown("slow");
  } else if (check.length === 0){
    $(`#error-msg`).text("Please enter some data to post tweet");
    $(`#error-msg`).append(`<i class="fas fa-exclamation-circle"></i> `);
    $(`#error-msg`).slideDown("slow");

  } else {
    $(`#error-msg`).hide();

    let newTweetData = $("#tweet-text").serialize();
    console.log(newTweetData);
    const url = "/tweets";
    $.ajax({ url: url, method:'POST', data: newTweetData})
      .then(function () { 
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
    rendertweets(newData);
  });
}
loadTweets();

});