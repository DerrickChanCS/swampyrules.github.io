
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
					temp_cond = "Freezing"; 
				}
				else if(temp >= 40 && temp < 55){
					temp_cond = "Cold"; 
				}

				else if(temp >= 55 && temp < 65){
					temp_cond = "Chilly";
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
			colors.push("Gray"); 
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

		//var user = Parse.User.current(); 
		var user = "lx6jPJFAaY"

		var gender_pref; 
		var User = Parse.Object.extend("User"); 
		var query = new Parse.Query("User"); 
		query.equalTo("objectId", user); 
		query.find({
			success: function(results) {
				var object = results[0]; 
				var m =object.get("male"); 
				var f = object.get("female");
				if(m && !f){
					gender_pref = "male"; 
				}
				else if(f && !m){
					gender_pref = "female"; 
				}
				else{
					gender_pref = "nopref"; 
				} 
				allquery(gender_pref, colors, season); 
			},
			error: function(error){
				alert("Error: " + error.code + ":" + error.message); 
			}
		});

		function allquery(gender_pref, colors, season){
			var mainq = new Parse.Query("Clothes"); 
			if(gender_pref === "nopref"){
				var num = Math.random(); 
				if(num >= 0.5){
					gender_pref = "male"; 
				}
				else{
					gender_pref = "female"; 
				}
			}
			mainq.equalTo(gender_pref, true);
		

		var weatherq = new Parse.Query("Clothes");
			mainq.equalTo("condition", weather_cond); 

		//var tempq = new Parse.Query("Clothes");
			mainq.equalTo("weather", temp_cond);  

		//var mainq = Parse.Query.or(genq, weatherq, tempq); 
			console.log(gender_pref); 
			console.log(weather_cond); 
			console.log(temp_cond); 
			mainq.find({
				success: function(results){
					var filtered = []; 
					for( var i = 0; i < results.length; i++){
						var temp = results[i].get("color");
						for(var j = 0; j < colors.length; j++){
							if(temp === colors[j]){
								filtered.push(results[i]); 
							}
						} 

					}

					console.log(filtered); 

					var casual = []; 
					var semi = []; 
					var formal = [];

					for(var i = 0; i < filtered.length; i++){
						var temp = filtered[i].get("occasion"); 
						if(temp === "Casual"){
							casual.push(filtered[i]); 
						}
						else if(temp === "Semi-Formal"){
							semi.push(filtered[i]); 
						}
						else{
							formal.push(filtered[i]); 
						}
					}

					console.log(casual); 
					console.log(semi); 
					console.log(formal);
					var finished_outfits_top = [];
					var finished_outfits_bot = [];  
					
					if(casual.length >= 2){
						var tops = []; 
						var bots = [];  
						for(var i = 0; i < casual.length; i++){
							var temp = casual[i].get("clothType"); 
							
							if(temp === "Shirt"){
								tops.push(casual[i]);  
							}
							if(temp === "Pants"){
								bots.push(casual[i]);  
							}
						}

						if(bots.length < 1 || tops.length < 1){

						}

						else{
							for(var i = 0; i < bots.length; i++){
								var color = bots[i].get("color"); 
								var match_top_colors = getMatchColor(season, color);
								for(var j = 0; j < tops.length; j++){
									var color2 = tops[j].get("color");
									for(var k = 0; k < match_top_colors.length; k++){
										if(color2 === match_top_colors[k]){
											finished_outfits_top.push(tops[j]); 
											finished_outfits_bot.push(bots[i]); 
										}
									} 
								}
							}
						}


					}

					if(semi.length >= 2){
						var tops = []; 
						var bots = [];  
						for(var i = 0; i < casual.length; i++){
							var temp = casual[i].get("clothType"); 
							
							if(clothType === "Shirt"){
								tops.push(casual[i]);  
							}
							if(clothType === "Pants"){
								bots.push(casual[i]);  
							}
						}

						if(bots.length < 1 || tops.length < 1){

						}

						else{
							for(var i = 0; i < bots.length; i++){
								var color = bots[i].get("color"); 
								var match_top_colors = getMatchColor(season, color);
								for(var j = 0; j < tops.length; j++){
									var color2 = tops[j].get("color");
									for(var k = 0; k < match_top_colors.length; k++){
										if(color2 === match_top_colors[k]){
											finished_outfits_top.push(tops[j]); 
											finished_outfits_bot.push(bots[i]); 
										}
									} 
								}
							}
						}

					}

					if(formal.length >= 2){
						var tops = []; 
						var bots = [];  
						for(var i = 0; i < casual.length; i++){
							var temp = casual[i].get("clothType"); 
							
							if(clothType === "Shirt"){
								tops.push(casual[i]);  
							}
							if(clothType === "Pants"){
								bots.push(casual[i]);  
							}
						}

						if(bots.length < 1 || tops.length < 1){

						}

						else{
							for(var i = 0; i < bots.length; i++){
								var color = bots[i].get("color"); 
								var match_top_colors = getMatchColor(season, color);
								for(var j = 0; j < tops.length; j++){
									var color2 = tops[j].get("color");
									for(var k = 0; k < match_top_colors.length; k++){
										if(color2 === match_top_colors[k]){
											finished_outfits_top.push(tops[j]); 
											finished_outfits_bot.push(bots[i]); 
										}
									} 
								}
							}
						}

					} 

					console.log(finished_outfits_bot); 
					console.log(finished_outfits_top); 

				}, 
				error: function(error){
					alert("Error: " + error.code + ":" + error.message); 
				}

				




			});
		} 

	}



	


});

function getMatchColor(season, color){
	var ret_val = []; 
	if(season === "fall")
	{
		if(color === "Red" || color === "Orange" || color === "Green"){
			ret_val.push("Gray");
			ret_val.push("Black");
			ret_val.push("White");
		}
		
		if(color === "Brown"){
			ret_val.push("Red"); 
			ret_val.push("Black");
			ret_val.push("White"); 
		}

		if(color === "Gray"){
			ret_val.push("Red"); 
			ret_val.push("Black");
			ret_val.push("White"); 
			ret_val.push("Orange"); 
			ret_val.push("Green");
		}

		if(color === "Black"){
			ret_val.push("Red"); 
			ret_val.push("Black");
			ret_val.push("White"); 
			ret_val.push("Orange"); 
			ret_val.push("Green");
			ret_val.push("Gray"); 
			ret_val.push("Brown"); 
		}

		if(color === "White"){
			ret_val.push("Red"); 
			ret_val.push("Black");
			ret_val.push("White"); 
			ret_val.push("Orange"); 
			ret_val.push("Green");
			ret_val.push("Gray"); 
			ret_val.push("Brown"); 
		}

	}

	if(season === "winter"){
		if(color === "Red"){
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "Blue"){
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "Purple"){
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "Yellow"){
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "Green"){
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "White"){
			ret_val.push("Red"); 
			ret_val.push("Blue");
			ret_val.push("Purple");  
			ret_val.push("Green");
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "Black"){
			ret_val.push("Red"); 
			ret_val.push("Blue");
			ret_val.push("Purple"); 
			ret_val.push("Yellow"); 
			ret_val.push("Green");
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
	}

	if(season === "spring"){
		if(color === "Red"){
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}

		if(color === "Pink"){
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "Purple"){
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "Yellow"){
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "Green"){
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "White"){
			ret_val.push("Red"); 
			ret_val.push("Pink");
			ret_val.push("Purple"); 
			ret_val.push("Yellow"); 
			ret_val.push("Green");
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "Black"){
			ret_val.push("Red"); 
			ret_val.push("Pink");
			ret_val.push("Purple"); 
			ret_val.push("Yellow"); 
			ret_val.push("Green");
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
	}
	if(season === "summer"){
		if(color === "Blue"){
			ret_val.push("Pink");
			ret_val.push("Purple"); 
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "Pink"){
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "Purple"){
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "Yellow"){
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "Green"){
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "White"){
			ret_val.push("Blue"); 
			ret_val.push("Pink");
			ret_val.push("Purple"); 
			ret_val.push("Yellow"); 
			ret_val.push("Green");
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
		if(color === "Black"){
			ret_val.push("Blue"); 
			ret_val.push("Pink");
			ret_val.push("Purple"); 
			ret_val.push("Yellow"); 
			ret_val.push("Green");
			ret_val.push("Black"); 
			ret_val.push("White"); 
		}
	}
	return ret_val; 
}
