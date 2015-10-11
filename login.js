
$(document).ready(function(){
	Parse.initialize("EAhGRHsW3bd43JhRN4rj27BOdjp2Afx7UiGa2CEo", "bcdx4nwYJgY4fYgvq8n2rTpbkjSGP3KR1vSGLd6q");
	var username;
	var password;
	$('#msg').hide();
	$('#submit').click(function() {
		$('#msg').hide();
		username = document.getElementById("username").value;
		password = document.getElementById("password").value;
		Parse.User.logIn(username, password, {
			success: function(user) {
				// Success do something
				console.log(username);
				console.log(password);
			},
			error: function(user, error) {
				// failed throw error
				console.log("failed");
				$('#msg').show();
			}
		});
	});

});
	
