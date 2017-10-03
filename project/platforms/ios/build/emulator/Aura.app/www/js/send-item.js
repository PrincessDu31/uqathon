

// function onSuccessSendLocalisation(position) {
      

// }
function afterSend() {
    // do something
}

$(document).ready(function(){

	$('#send-geolocalisation').click(function() {

		if ($(".textarea-title").val() != "" || $(".textarea-content").val() != "") {
	        jQuery.ajax({
			    url: "http://perso-etudiant.u-pem.fr/~eritoux/aura/api/register-item.php",
		  		type: "POST",
		  		crossDomain:"true",
			    data: {latitude: latitude, longitude: longitude, title: $(".textarea-title").val().replace(/'/g, "\\'").replace(/"/g, '\\\\\"').replace(/\r?\n/g, '<br/>'), content: $(".textarea-content").val().replace(/'/g, "\\'").replace(/"/g, '\\\\\"').replace(/\r?\n/g, '<br/>'), place : currentLocation},
			    dataType: "html",
			    beforeSend: function(x) {
			       	if (x && x.overrideMimeType) {
			           	x.overrideMimeType("application/j-son;charset=UTF-8");
		            }

		        },
			    success: function(result) {
			     	navigator.notification.alert("Création déposée !", afterSend, "", "");
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