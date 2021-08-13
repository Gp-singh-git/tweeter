/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */


// Function to create the HTML elements that will contain our tweet.
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

//Function that will iterate through out tweets database array to render it to screen
const rendertweets = function(data) {
  
  for (let entry of data.reverse()) {
    const $post = createTweetElement(entry);
    $('#tweet-containerid').append($post);
  }
};

//Function used for Cross site scripting
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Function that fetches tweets data through GET request
const loadTweets = function() {
  const url = "/tweets";
  $.ajax({url:url, method:'GET'})
    .then(function(newData) {
      rendertweets(newData);
    });
};
  
//Main code to be executed when DOM is ready

$(document).ready(function() {
  loadTweets();                               //Loading tweets from database
  $(`#form-tweet`).submit(function(event) {
    event.preventDefault();                   //To prevent further action on form submit
    const check = $("#tweet-text").val();
    if (check.length > 140) {                 //Checking 140 character word limit and alert message
      $(`#error-msg`).text("Please dont Exceed the 140 character limit");
      $(`#error-msg`).append(`<i class="fas fa-exclamation-circle"></i> `);
      $(`#error-msg`).slideDown("slow");
    } else if (check.length === 0) {          //Checking empty tweet and alert message
      $(`#error-msg`).text("Please enter some data to post tweet");
      $(`#error-msg`).append(`<i class="fas fa-exclamation-circle"></i> `);
      $(`#error-msg`).slideDown("slow");
    } else {
      $(`#error-msg`).hide();               //Hide error message
      let newTweetData = $("#tweet-text").serialize();
      console.log(newTweetData);
      const url = "/tweets";
      $.ajax({ url: url, method:'POST', data: newTweetData})    //POST request to post tweet to database
        .then(function() {
          console.log("successfully posted: ");
          $.ajax({url:url, method:'GET'})                       //GET request to fetch only latest tweet posted to show on screen
            .then(function(data_new) {
              let obj = data_new[data_new.length - 1];
              const $post = createTweetElement(obj);
              $('#tweet-containerid').prepend($post);
              $('#tweet-text').val('');
            });
        });
    }
  });
mybutton = document.getElementById("topButton");

window.onscroll = function() {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

const goTop = function() {
  document.body.scrollTop = 0;  
  document.documentElement.scrollTop = 0;  
}

$(`#topButton`).click(function(event) {
  goTop();
});

});