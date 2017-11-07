function ajaxFunctionGetUser(form){

	var formData = $(form).serialize();


		// Submit the form using AJAX.
		$.ajax({
			type: 'post',
			url: 'http://perso-etudiant.u-pem.fr/~eritoux/aura/api/forget-password.php',
			data: formData,
			dataType : 'json',
			success: function(rep){
				// $(".reponse").html(rep[0]['date']);

					window.location = "connexion.html"; 
						navigator.notification.alert("Suivez les instructions pour changer votre mot de passe.", function () {
						window.location = "connexion.html";
					}, "Un mail vous a été envoyé.", "");
        	},
        	error: function () { 
            	$(".reponse").html("Erreur");
        	}
		})
}


$(document).ready(function(){


	// Get the form.
	var form = $('#ajax-forget-password');

	// Set up an event listener for the contact form.
	$(form).submit(function(event) {
		// Stop the browser from submitting the form.
		event.preventDefault();

		ajaxFunctionGetUser(form);


	});

});