var timeout = [null, null, null, null, null, null];

$(document).ready(function(){
	$(".like-btn").hover(function() {
	    $(".reaction-icon").each(function(i, e) {
	      timeout[i] = setTimeout(function(){
	        $(e).addClass("show");
	      }, i * 100);
	    });
  	}, function() {
    	$(".reaction-icon").removeClass("show");

    	timeout.forEach(function(e, i){
    		clearTimeout(e);
    	});
  	});

  	$(".like-btn").click(function(event){
  		var id = $(event.target).attr('id');
  		console.log(id);
  	});
});