$(document).ready(function(){

	$('.create').click(function() {
		$('#home-content').slideUp("slow", "swing");
		$('#creation-interface-content').slideDown("slow", "swing");
	});

	$('.create-text-close').click(function() {
		$('#home-content').slideDown("slow", "swing");
		$('#creation-interface-content').slideUp("slow", "swing");

	});
 
});