	
	function ajaxFunctionNewPassword() {
		$.ajax({
			type: 'post',
			url: 'http://perso-etudiant.u-pem.fr/~eritoux/aura/api/newPasswordAJAX.php',
			data: {password: $(".password").val(), userID: userID},
			dataType : 'json',
			success: function(rep){
				if (rep[0]['sucess'] =="1") {
					$(".reponse").html("Votre mot de passe s'actualisé avec succès.");
					$(".password").val("");
				}
				else { 
					$(".reponse").html("Une erreur s'est produite");
				}
				$(".password-confirm").val("");
        	},
        	error: function () { 
            	$(".reponse").html("Suite à une erreur technique, le mot de passe ne s'est pas actualisé.");
        	}
		})
	}


$(document).ready(function(){

	var form = $('#ajax-change-password');
	$(form).submit(function(event) {
		event.preventDefault();
		if ($(".password").val() == $(".password-confirm").val()) {
			ajaxFunctionNewPassword();

		}
		else {
			$(".reponse").html("Les deux mots de passe ne sont pas identiques.");
			$(".password-confirm").val("");
		}
	});
});