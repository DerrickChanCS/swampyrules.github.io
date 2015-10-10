$(document).ready(function(){
	var username;
	var password;

	$('#submit').click(function() {
		username = document.getElementById("username").value;
		password = document.getElementById("password").value;
		console.log(username);
		console.log(password);
	});



});