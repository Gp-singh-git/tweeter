
$(document).ready(function() {
    
  $("#tweet-text").on("input", function(e){
  // const counter = e.target.value.length;
  const counter = this.value.length;
  const inputlength = 140 - counter;

  $(".counter").text(inputlength); 

    if(inputlength < 0 ) {
      $(".counter").css({ "color":"red"});
    } else {
      $(".counter").css({ "color":"black"});
    }

});
});
