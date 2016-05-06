$(document).ready(function(){
  $("form#loginForm").submit(function() {
    var email = $('#email').val();
    var password = $('#password').val();
    var result = $('div#loginResult');

    if (email && password) {
      $.post("/cgi-bin/login.pl", {email: email, password: password}, function(data){
          if (data.error) {
            result.text("Error: " + data.error);
            result.addClass("error");
          }
          else {
            $('form#loginForm').hide();
            result.text("Welcome " + data.name);
            result.addClass("success");
          }
        });
    }
    else {
      result.text("enter email and password");
      result.addClass("error");
    }
    result.fadeIn();
    return false;
  });
});