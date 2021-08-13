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
    })
    .catch(() => {
      alert("Server failed to Get Data");
    })
  };

// Function to show Go to Top button  
const showButton = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

// Function to take user at the top of page
const goTop = function() {
  document.body.scrollTop = 0;  
  document.documentElement.scrollTop = 0;  
};