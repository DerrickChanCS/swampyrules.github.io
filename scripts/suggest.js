
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
		//$('#weather').attr("title",city).tooltip('fixTitle');
		$.simpleWeather({
			location: city, 
			woeid: "",
			unit: 'f', 
			success: function(weather){
				var high_temp = weather.high;
				var cur_temp = weather.temp;
				var wind = weather.wind.chill;
				var code = weather.code;


				var hour = new Date();
				hour = hour.getHours();  
				console.log(hour);

				var temp; 
				if( hour >= 9 && hour < 15){
					temp = high_temp - wind; 
				} 
				else{
					temp = cur_temp - wind; 
				}


				var temp_cond = ""; 
				if(temp < 40){
					temp_cond = "freezing"; 
				}
				else if(temp >= 40 && temp < 55){
					temp_cond = "cold"; 
				}

				else if(temp >= 55 && temp < 65){
					temp_cond = "cold";
				}
				else if(temp >= 65 && temp < 70){
					temp_cond = "brisk"; 
				}
				else if(temp >= 70 && temp < 85){
					temp_cond = "warm"; 
				}
				else{
					temp_cond = "hot"; 
				}

				
				
			}
		});
	}

});


