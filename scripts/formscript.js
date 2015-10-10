$(document).ready(function() {
	//Load parse
	Parse.initialize("EAhGRHsW3bd43JhRN4rj27BOdjp2Afx7UiGa2CEo", "bcdx4nwYJgY4fYgvq8n2rTpbkjSGP3KR1vSGLd6q");

	function createUser() {

	// Parse auth
	var user = new Parse.User();

	user.set("username", uname);
	user.set("password", pass1);
	user.set("email", email);
	user.set("firstName", first);
	user.set("lastName", last);

	if (gender = "male") {
		user.set("male", true);
		user.set("female", false);
	} else if (gender = "female") {
		user.set("female", true);
		user.set("male", false);
	} else {
		user.set("male", true);
		user.set("female", true);
	}

	user.signUp(null, {
  		success: function(user) {
    		// Hooray! Let them use the app now.
  	},
  	error: function(user, error) {
    		// Show the error message somewhere and let the user try again.
    	alert("Error: " + error.code + " " + error.message);
  		}
	});
}



	var gender;
	var first;
	var last;
	var uname;
	var pass1;
	var pass2;
	var email;

	$("#error").hide();
	$("#error2").hide();

	$("#male").click(function(){
		var currentclass = $("#male").attr("class");

		if (currentclass == "btn btn-default") {
			$("#male").removeClass("btn btn-default").addClass("btn btn-default active");
			$("#male").addClass("active");
		} else {
			$("#male").removeClass("btn btn-default active").addClass("btn btn-default");
			$("#male").removeClass("active");
		}
			
	});

	$("#female").click(function(){
		var currentclass = $("#female").attr("class");

		if (currentclass == "btn btn-default") {
			$("#female").removeClass("btn btn-default").addClass("btn btn-default active");
			$("#female").addClass("active");
		} else {
			$("#female").removeClass("btn btn-default active").addClass("btn btn-default");
			$("#female").removeClass("active");
		}
			
	});

	$("#none").click(function(){
		var currentclass = $("#none").attr("class");

		if (currentclass == "btn btn-default") {
			$("#none").removeClass("btn btn-default").addClass("btn btn-default active");
			$("#none").addClass("active");
		} else {
			$("#none").removeClass("btn btn-default active").addClass("btn btn-default");
			$("#none").removeClass("active");
		}
			
	});
  

	$("#create").click(function(){
		var i = 0;

		$("#error").hide();
		$("#error2").hide();



		//Check that each field has value
		first = document.getElementById("first").value;
		last = document.getElementById("last").value;
		uname = document.getElementById("username").value;
		pass1 = document.getElementById("password").value;
		pass2 = document.getElementById("repassword").value;
		email = document.getElementById("email").value;

		




		//Check that user has clicked a gender
		var maleClass = $("#male").hasClass("active");
		var femaleClass = $("#female").hasClass("active");
		var noneClass = $("#none").hasClass("active");
		
		//Check that there is something in each field before submitting

		if (maleClass == false && femaleClass == false && noneClass == false) {
			$("#error2").show();
			i++;
		}
		if (maleClass == "active") {
			gender = "male";
		}
		if (femaleClass == "active") {
			gender = "female";
		}
		if (noneClass == "active") {
			gender = "none;"
		}
		if (first == '') {
			$("#error2").show();
			document.getElementById('first').style.borderColor = "red";
			i++;
		}
		if (last == '') {
			$("#error2").show();
			document.getElementById('last').style.borderColor = "red";
			i++;
		}
		if (uname == '') {
			$("#error2").show();
			document.getElementById('username').style.borderColor = "red";
			i++;
		}
		if (pass1 == '') {
			$("#error2").show();
			document.getElementById('password').style.borderColor = "red";
			i++;
		}
		if (pass2 == '') {
			$("#error2").show();
			document.getElementById('repassword').style.borderColor = "red";
			i++;

		}
		if (email == '') {
			$("#error2").show();
			document.getElementById('email').style.borderColor = "red";
			i++;

		}
		if (pass1 != pass2) {
			$("#error").show();
			i++;
		}

		
  	
	if (i > 0) {
		
		return false;
	}
	
	return createUser();
//Function that only creates user parsing data if create returns true (otherwise create will return false until it returns true)
		
	});







});