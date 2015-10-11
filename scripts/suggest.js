
$(document).ready(function(){
	Parse.initialize("EAhGRHsW3bd43JhRN4rj27BOdjp2Afx7UiGa2CEo", "bcdx4nwYJgY4fYgvq8n2rTpbkjSGP3KR1vSGLd6q")
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
				var wind = weather.wind.chill;
				var code = weather.code;


				var hour = new Date();
				hour = hour.getHours();  
				console.log(hour);

				var temp; 
				if( hour >= 9 && hour < 15){
					temp = high_temp; 
				} 
				else{
					temp = wind; 
				}

				 
				var temp_cond = ""; 
				if(temp < 40){
					temp_cond = "freezing"; 
				}
				else if(temp >= 40 && temp < 55){
					temp_cond = "cold"; 
				}

				else if(temp >= 55 && temp < 65){
					temp_cond = "Cold";
				}
				else if(temp >= 65 && temp < 70){
					temp_cond = "Normal"; 
				}
				else if(temp >= 70 && temp < 85){
					temp_cond = "Warm"; 
				}
				else{
					temp_cond = "Hot"; 
				}

				console.log(temp_cond);

				var weather_cond; 
				if(code === 0 || code === 24){
					weather_cond = "Windy"; 
				} 
				else if( code === 1 || code === 2 || code === 3 || code === 4 || code === 8 || code === 9 || code === 10 ||
					     code === 11 || code === 12 || code === 35 || code === 37 || code === 38 || code === 39 ||
					     code === 40 || code === 45 || code === 47) {
					weather_cond = "Rainy"; 
				}

				else if ( code === 5 || code === 6 || code === 7 || code === 13 || code === 14 || code === 15 || code === 16 ||
					      code === 17 || code === 18 || code === 23 || code === 41 || code === 42 || code === 43 ||
					      code === 46){
					weather_cond = "Snowy"; 
				}
				else{
					weather_cond = "Normal"; 
				}

				console.log(weather_cond); 

				var date = new Date();
				var month = date.getMonth();
				var day = date.getDate();   
				var season; 

				if(month === 0 || month === 1){
					season = "winter"; 
				}
				else if(month === 3 || month === 4){
					season = "spring"; 
				}
				else if(month === 6 || month === 7){
					season = "summer"; 
				}
				else if(month === 9 || 10){
					season = "fall"; 
				}
				else{
					if(month === 2){
						if(day >= 21){
							season = "spring"; 
						}
						else{
							season = "winter"; 
						}
					}
					if(month === 5){
						if(day >= 21){
							season = "summer"; 
						}
						else{
							season = "spring"; 
						}
					}
					if(month === 8){
						if(day >= 21){
							season = "fall"; 
						}
						else{
							season = "summer"; 
						}
					}
					if(month === 11){
						if(day >= 21){
							season = "winter"; 
						}
						else{
							season = "fall"; 
						}
					}


				}

				console.log(season); 
				getOutfit(weather_cond, temp_cond, season); 
				
			}
		});

	
	}

	function getOutfit(weather_cond, temp_cond, season){
		// console.log("TBD");
		var colors = []; 
		if(season === "fall"){
			colors.push("Red"); 
			colors.push("Orange");
			colors.push("Green"); 
			colors.push("Brown"); 
			colors.push("Grey"); 
			colors.push("Black"); 
			colors.push("White"); 
		}
		else if(season === "winter"){
			colors.push("Red"); 
			colors.push("Blue"); 
			colors.push("Purple"); 
			colors.push("Green"); 
			colors.push("Yellow"); 
			colors.push("Black"); 
			colors.push("White"); 
		}
		else if(season === "spring"){
			colors.push("Red"); 
			colors.push("Pink"); 
			colors.push("Green"); 
			colors.push("Purple"); 
			colors.push("Yellow"); 
			colors.push("Black"); 
			colors.push("White"); 
		}
		else if(season === "summer"){
			colors.push("Blue"); 
			colors.push("Purple"); 
			colors.push("Pink"); 
			colors.push("Green"); 
			colors.push("Yellow"); 
			colors.push("Black"); 
			colors.push("White"); 
		}

		console.log(colors); 


	}



	


});


