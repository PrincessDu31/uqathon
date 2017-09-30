

function onSuccessLocalisation(position) {
        var element = document.getElementById('geolocation');
        latitude = position.coords.latitude ;
        longitude = position.coords.longitude;

        jQuery.ajax({
		    url: "http://perso-etudiant.u-pem.fr/~eritoux/aura/api/register-item.php",
	  		type: "POST",
		    data: {latitude: latitude, longitude: longitude},
		    dataType: "json",
		    beforeSend: function(x) {
		       	if (x && x.overrideMimeType) {
		           	x.overrideMimeType("application/j-son;charset=UTF-8");
	            }
	        },
		       success: function(result) {
		     	alert(result);
	        }
		}); 

}

$(document).ready(function(){

	$('#send-geolocalisation').click(function() {
		alert("yes!");
		navigator.geolocation.getCurrentPosition(onSuccessLocalisation, onError);

		
	});
});