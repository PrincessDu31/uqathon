

function onSuccessLocalisation(position) {
        latitude = position.coords.latitude ;
        longitude = position.coords.longitude;

        jQuery.ajax({
		    url: "http://perso-etudiant.u-pem.fr/~eritoux/aura/api/register-item.php",
	  		type: "POST",
		    data: {latitude: latitude, longitude: longitude, content: $(".textarea-content").val()},
		    dataType: "html",
		    beforeSend: function(x) {
		       	if (x && x.overrideMimeType) {
		           	x.overrideMimeType("application/j-son;charset=UTF-8");
	            }
	        },
		    success: function(result) {
		     	alert("yes!");
	        }
		}); 

}

$(document).ready(function(){

	$('#send-geolocalisation').click(function() {
		navigator.geolocation.getCurrentPosition(onSuccessLocalisation, onError);
	});
});