/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

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
          })
          .catch((error) => {
            alert("Server Failed to get data. ", error);
          })
      })
      .catch((error) => {
        alert("Server Failed to post data. ", error);
      });
    }
  });

  mybutton = document.getElementById("topButton");    //Getting button to work on
  window.onscroll = function() {
    showButton()
  };
  $(`#topButton`).click(function(event) {             //On click, calling goTop function
    goTop();
  });

});