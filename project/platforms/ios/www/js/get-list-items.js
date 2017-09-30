$(document).ready(function(){

	$('#get-items-geolocalisation').click(function() {
		 jQuery.ajax({
		    url: "http://perso-etudiant.u-pem.fr/~eritoux/aura/api/get-list-items.php",
		    dataType: "json",
		    beforeSend: function(x) {
		       	if (x && x.overrideMimeType) {
		           	x.overrideMimeType("application/j-son;charset=UTF-8");
	            }
	        },
		    success: function(result) {
		     	alert("longitude" + result[0]["latitude"] + ", longitude" + result[0]["longitude"] + ", content" + result[0]["content"]);
	        }
		}); 
		
	});
});