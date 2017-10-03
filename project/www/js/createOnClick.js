$(document).ready(function(){

	$('.create').click(function() {
	    $('#creation-interface-content').css("padding-top", "25vh");
		$('#home-content').slideUp("slow", "swing");
		$('#creation-interface-content').slideDown("slow", "swing");

	});

	$('.create-text-close').click(function() {
	    $('#creation-interface-content').css("padding-top", "25vh");
		$('#home-content').slideDown("slow", "swing");
		$('#creation-interface-content').slideUp("slow", "swing");

	});

 
});