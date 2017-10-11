
function createCookie(name, value, days) {
			var expires;
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
			} else {
	        expires = "";
	      }
	      document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}


function getCookie(name){
   	if(document.cookie.length == 0)
		return null;

	var regSepCookie = new RegExp('(; )', 'g');
	var cookies = document.cookie.split(regSepCookie);

	for(var i = 0; i < cookies.length; i++){
		var regInfo = new RegExp('=', 'g');
		var infos = cookies[i].split(regInfo);
		
		if(infos[0] == name){
       		return unescape(infos[1]);
		}
	}
	return null;
}


