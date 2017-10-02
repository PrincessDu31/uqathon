

// function onSuccessSendLocalisation(position) {
      

// }

$(document).ready(function(){

	$('#send-geolocalisation').click(function() {

		if ($(".textarea-title").val() != "" && $(".textarea-content").val() != "") {
	        jQuery.ajax({
			    url: "http://perso-etudiant.u-pem.fr/~eritoux/aura/api/register-item.php",
		  		type: "POST",
			    data: {latitude: latitude, longitude: longitude, title: $(".textarea-title").val().replace(/'/g, "\\'").replace(/[\n\r]/g, ''), content: $(".textarea-content").val().replace(/'/g, "\\'"), place : currentLocation},
			    dataType: "html",
			    beforeSend: function(x) {
			       	if (x && x.overrideMimeType) {
			           	x.overrideMimeType("application/j-son;charset=UTF-8");
		            }

		        },
			    success: function(result) {
			     	alert("Création déposée !");
					actualizeHome();
					
		        },
		        error: function(result) {
	                alert("error");
	            }
			});
	    } 
	    	$('#home-content').slideDown("slow", "swing");
			$('#creation-interface-content').slideUp("slow", "swing");
			$('.textarea-title').val("");
			$('.textarea-content').val("");
 	});
});