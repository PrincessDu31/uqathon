

function ajaxFunctionGetUser(form){

	var formData = $(form).serialize();


		// Submit the form using AJAX.
		$.ajax({
			type: 'post',
			url: 'http://perso-etudiant.u-pem.fr/~eritoux/aura/api/createAccount.php',
			data: formData,
			dataType : 'json',
			success: function(rep){
				if (rep[0]['sucess'] =="ok") {
					$(".reponse").html("Votre compte a bien été créé.");
					user_id = rep[1]['id_user'];
					user_pseudo = rep[1]['pseudo_user'];
					window.localStorage.setItem(name_cookie_idUser, user_id);
					window.localStorage.setItem(name_cookie_nameUser, user_pseudo);

					 // createCookie(name_cookie_idUser, id, "2");
					// createCookie(name_cookie_nameUser, name, "2");
					// alert(window.localStorage.getItem(name_cookie_idUser));
					// alert(window.localStorage.getItem(name_cookie_nameUser));
					// if (window.localStorage.getItem(name_cookie_idUser) && window.localStorage.getItem(name_cookie_nameUser)) 
						window.location = "index.html"; 

				} else if (rep[0]['sucess'] == "pseudo already used") {
					$(".reponse").html("Ce nom est déjà utilisé.");
				}
				else
					$(".reponse").html("Une erreur est survenue");

        	},
        	error: function () { 
            	$(".reponse").html("Suite à une erreur technique, le compte n'a pas été créé.");
        	}
		})
}


$(document).ready(function(){


	// Get the form.
	var form = $('#ajax-create-account');

	// Set up an event listener for the contact form.
	$(form).submit(function(event) {
		// Stop the browser from submitting the form.
		event.preventDefault();

		ajaxFunctionGetUser(form);


	});

});