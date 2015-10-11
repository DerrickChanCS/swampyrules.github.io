$(document).ready(function(){
	$('#settingsText').hide()
	$('[data-toggle="tooltip"]').tooltip(); 
	$('#settingsSpan').hover(function(){
		console.log("on");
		$('#settingsText').show();
		$('#settings').hide();
		//$('#settingsText').fadeIn(300);
		//$('#settings').fadeOut(300);
	},
	function(){
		console.log("off");
		$('#settingsText').fadeOut(300);
		$('#settings').fadeIn(300);
		});

	$('.carousel').slick({
  		centerMode: true,
  		centerPadding: '60px',
  		slidesToShow: 3,
  		//autoplay: true,
  		autoplaySpeed: 2000,
  		responsive: [{
      		breakpoint: 768,
      		settings: {
        		arrows: false,
        		centerMode: true,
        		centerPadding: '40px',
        		slidesToShow: 3
      		}
    	},
    	{
      		breakpoint: 480,
      		settings: {
        		arrows: false,
        		centerMode: true,
        		centerPadding: '40px',
        		slidesToShow: 1
      		}
    	}
  		]
	});
	$('.outfit1').click(function(){
		$('#carouselTop').slick('slickPause');
		$('#carouselBot').slick('slickPause');	
	});
	$('.outfit2').click(function(){
		$('#carouselTop').slick('slickPause');
		$('#carouselBot').slick('slickPause');
	});
	$('.outfit3').click(function(){
		$('#carouselTop').slick('slickPause');
		$('#carouselBot').slick('slickPause');
	});

	$('#carouselTop').on('beforeChange',function(event,slick,currentSlide,nextSlide){
		$('#carouselBot').slick('slickNext');
	});
	

});

	

/**function resizeImg() {
	
	/**for (i=1; i<7; i++) {
		var string1 = ((i % 3) + 1).toString();
		console.log(string1); 
		var string2 = ".jpg";
		console.log(string2); 
		var string3 = string1.concat(string2);
		console.log(string3);
		//@pjs preload = "1.jpg"; 
		PImage img=loadImage(string3);
		img.resize(500,0);
		$('#'+"img"+i).attr("src", string3);
	}
	

} **/
