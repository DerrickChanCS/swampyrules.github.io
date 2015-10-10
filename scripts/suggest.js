$(document).ready(function(){
	console.log("hi");
	var geocoder;
	geocoder = new google.maps.Geocoder(); 
 	 
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(successFunction, errorFunction);  
	}

	function successFunction(position){
		var lat = position.coords.latitude; 
		var lng = position.coords.longitude;
		codeLatLng(lat, lng);   
	}

	function errorFunction(){
		alert("Geocoder failed"); 
	}


	function codeLatLng(lat, lng){
		var latlng = new google.maps.LatLng(lat, lng); 
		geocoder.geocode({'latLng': latlng}, function(results, status){
			if(status == google.maps.GeocoderStatus.OK){
				var city = results[1].formatted_address; 
			}
			else{
				alert("Geocoder failed due to: " + status); 
			}
			getWeather(city); 
		});
	}


	function getWeather(city){
		console.log(city); 
		$('#weather').attr("title",city).tooltip('fixTitle');
	}

});


