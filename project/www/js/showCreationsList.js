$(document).ready(function(){

	$('.nb-creative-posts').click(function() {

		if (Object.keys(creationsItem).length > 0) {
			// $('#home-content').fadeOut("slow", "swing", $('#home-content').css("display", "none"));
			// $('#home-content').fadeOut("slow", "swing", $('#home-content').css("display", "none"));
			$('#home-content').fadeOut("fast", "swing");

			
		}
	});


	$('#home-header').click(function() {
			$('.create-text-close').click();
			// $('#home-content').css("display", "block");
			$('#home-content').fadeIn("fast", "swing");

			
	});



});
