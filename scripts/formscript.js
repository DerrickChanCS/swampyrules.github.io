$(document).ready(function() {
	var gender;

	$("#error").hide();
	$("#error2").hide();

	$("#male").click(function(){
		var currentclass = $("#male").attr("class");

		if (currentclass == "btn btn-default") {
			$("#male").removeClass("btn btn-default").addClass("btn btn-default active");
			$("#male").addClass("active");
		} else {
			$("#male").removeClass("btn btn-default active").addClass("btn btn-default");
		}
			
	});

	$("#female").click(function(){
		var currentclass = $("#female").attr("class");

		if (currentclass == "btn btn-default") {
			$("#female").removeClass("btn btn-default").addClass("btn btn-default active");
			$("#female").addClass("active");
		} else {
			$("#female").removeClass("btn btn-default active").addClass("btn btn-default");
		}
			
	});

	$("#none").click(function(){
		var currentclass = $("#none").attr("class");

		if (currentclass == "btn btn-default") {
			$("#none").removeClass("btn btn-default").addClass("btn btn-default active");
			$("#none").addClass("active");
		} else {
			$("#none").removeClass("btn btn-default active").addClass("btn btn-default");
		}
			
	});

	

	$("#create").click(function(){
		$("#error").hide();
		$("#error2").hide();

		//Check that each field has value
		var first = document.getElementById("first").value;
		var last = document.getElementById("last").value;
		var uname = document.getElementById("username").value;
		var pass1 = document.getElementById("password").value;
		var pass2 = document.getElementById("repassword").value;
		var email = document.getElementById("email").value;

		//Check that user has clicked a gender
		var maleClass = $("#male").hasClass("active");
		var femaleClass = $("#female").hasClass("active");
		var noneClass = $("#none").hasClass("active");
		
		//Check that there is something in each field before submitting

		if (maleClass == false) {
			$("#error2").show();
			//Highlight field
		} else {
			gender = "male";
		}
		if (femaleClass == false) {
			$("#error2").show();		
		} else {
			gender = "female";
		}
		if (noneClass == false) {
			$("#error2").show();
		} else {
			gender = "none";
		}
		if (first == '') {
			$("#error2").show();
			document.getElementById('first').style.borderColor = "red";
		}
		if (last == '') {
			$("#error2").show();
			document.getElementById('last').style.borderColor = "red";
		}
		if (uname == '') {
			$("#error2").show();
			document.getElementById('username').style.borderColor = "red";
		}
		if (pass1 == '') {
			$("#error2").show();
			document.getElementById('password').style.borderColor = "red";
		}
		if (pass2 == '') {
			$("#error2").show();
			document.getElementById('repassword').style.borderColor = "red";
		}
		if (email == '') {
			$("#error2").show();
			document.getElementById('email').style.borderColor = "red";
		}
		if (pass1 != pass2) {
			$("#error").show();
		}
		
	});


});