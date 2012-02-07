$(document).ready(function() {

	//save selectors as variables to increase performance
	var $window = $(window);
	var $headerBG = $('#story-header');
	var $videoBG = $('#story-video');
	var $officesBG = $('#story-offices');
	var $intelBG = $('#story-intel');
	var $williamBG = $('#story-william');
	var $bingBG = $('#story-bing');
	var $bestBuyBG = $('#story-bestBuy');
	var $nikeBG = $('#story-nike');
	var $keystoneBG = $('#story-keystone');
	var $mercedezBG = $('#story-mercedes');
	var $barbieBG = $('#story-barbie');
	var $leviBG = $('#story-levi');
	var $thanksBG = $('#story-thanks');
	//Some crazy animations
	var bingLG = $("#story-bing .bg");
	var bestBuyLG = $("#story-bestBuy .bg");
	var nikeLG = $("#story-nike .bg");
	var mercedezLG = $("#story-mercedes .bg");
	
	var windowHeight = $window.height(); 
	
	var wide = $window.width();
	//console.log(wide);
	
	//apply the class "inview" to a section that is in the viewport
	$('section').bind('inview', function (event, visible) {
			if (visible == true) {
			$(this).addClass("inview");
			} else {
			$(this).removeClass("inview");
			}
			
			/*var secLoc = $(this).attr('id');
			if ($('section').hasClass("inview")){
				$("#main ul li").removeClass("active")			     
				$("#main ul li[data-id="+secLoc+"]").addClass("active");
			}*/
			
			var $homeBubble = $("li[data-id='story-header'] h1");
			if ( $('section#story-header').hasClass('inview') )    {}
           
			else
		    {$homeBubble.stop().animate({left:15,opacity:0},450,'easeOutQuart',function(){$homeBubble.stop().css({display:'none'})})}

					   
			
		});
	

		


	//function that places the navigation in the center of the window
	function RepositionNav(){
		var windowHeight = $window.height(); //get the height of the window
		var navHeight = $('#nav').height() / 2;
		var windowCenter = (windowHeight / 2); 
		var newtop = windowCenter - navHeight;
		$('#nav').css({"top": newtop}); //set the new top position of the navigation list
	}
	
	//function that is called for every pixel the user scrolls. Determines the position of the background
	/*arguments: 
		x = horizontal 
		windowHeight = height of the viewport
		pos = position of the scrollbar
		adjuster = adjust the position of the background
		inertia = how fast the background moves in relation to scrolling
	*/
	function newPos(x, windowHeight, pos, adjuster, inertia){
		
		return x + "% " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";console.log(newPos)
	}
	
	//function to be called whenever the window is scrolled or resized
	function Move(){ 
		var pos = $window.scrollTop(); //position of the scrollbar


		
		//For header view...
		if($videoBG.hasClass("inview")){
			//call the newPos function and change the background position
			$videoBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 850, 0.4)}); 
		}
		
		//For video view...
		if($videoBG.hasClass("inview")){
			//call the newPos function and change the background position
			$videoBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 1850, 0.4)}); 
		}
		
		//For offices view...
		if($officesBG.hasClass("inview")){
			//call the newPos function and change the background position
			$officesBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 2850, 0.4)}); 
		}
		
		//For Intel view...
		if($intelBG.hasClass("inview")){
			//call the newPos function and change the background position
			$intelBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 3850, 0.4)}); 
		}
		
		//For Will.i.am view...
		if($williamBG.hasClass("inview")){
			//call the newPos function and change the background position
			$williamBG.css({'backgroundPosition': newPos(40, windowHeight, pos, 4850, 0.4)}); 
		}
		
		//For Bing view...
		if($bingBG.hasClass("inview")){
			if (wide < 1300){
			//call the newPos function and change the background position
			$bingBG.css({'backgroundPosition': newPos(40, windowHeight, pos, 5850, 0.3)});
			//call the newPos function and change the secnond background position
			bingLG.css({'backgroundPosition': newPos(75, windowHeight, pos, 6400, 0.6)});
			}
			else{
							//call the newPos function and change the background position
			$bingBG.css({'backgroundPosition': newPos(40, windowHeight, pos, 5850, 0.3)});
			//call the newPos function and change the secnond background position
			bingLG.css({'backgroundPosition': newPos(55, windowHeight, pos, 6400, 0.6)});
			}
		}
		
		//For Best Buy view...
		if($bestBuyBG.hasClass("inview")){
			if (wide < 1300){
			$bestBuyBG.css({'backgroundPosition': newPos(90, windowHeight, pos, 6750, 0.3)});
			//call the newPos function and change the secnond background position
			bestBuyLG.css({'backgroundPosition': newPos(90, windowHeight, pos, 6400, -0.3)});
			}
			else {
			$bestBuyBG.css({'backgroundPosition': newPos(90, windowHeight, pos, 6750, 0.3)});
			//call the newPos function and change the secnond background position
			bestBuyLG.css({'backgroundPosition': newPos(70, windowHeight, pos, 6400, -0.3)});
			}
		}
		
		//For Nike view...
		if($nikeBG.hasClass("inview")){
			if (wide < 1300){
			//call the newPos function and change the background position
			$nikeBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 8200, 0.5)});
			//call the newPos function and change the secnond background position
			nikeLG.css({'backgroundPosition': newPos(90, windowHeight, pos, 11200, 0.1)});
			}
			else{
			//call the newPos function and change the background position
			$nikeBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 8200, 0.5)});
			//call the newPos function and change the secnond background position
			nikeLG.css({'backgroundPosition': newPos(60, windowHeight, pos, 11200, 0.1)});
			}
		}
		
		//For Keystone view...
		if($keystoneBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			$keystoneBG.css({'backgroundPosition': newPos(65, windowHeight, pos, 8700, 0.1) + ", " + newPos(65, windowHeight, pos, 9400, 0.9) + ", " + newPos(50, windowHeight, pos, 9000, 0.3)});
		}
		
		//For Mercedez view...
		if($mercedezBG.hasClass("inview")){
			if (wide < 1300){
			//call the newPos function and change the background position
			$mercedezBG.css({'backgroundPosition': newPos(90, windowHeight, pos, 8800, -0.5)});
			//call the newPos function and change the secnond background position
			mercedezLG.css({'backgroundPosition': newPos(85, windowHeight, pos, 10300, 0.5)});
			}
				else{
			//call the newPos function and change the background position
			$mercedezBG.css({'backgroundPosition': newPos(60, windowHeight, pos, 8800, -0.5)});
			//call the newPos function and change the secnond background position
			mercedezLG.css({'backgroundPosition': newPos(60, windowHeight, pos, 10300, 0.5)});
				}
		}
		
		
		//For Barbie view...
		if($barbieBG.hasClass("inview")){
			if (wide < 1300){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			$barbieBG.css({'backgroundPosition': newPos(-25, windowHeight, pos, 10800, 0.6)/* + ", " + newPos(80, windowHeight, pos, 10800, 0.6) + ", " + newPos(50, windowHeight, pos, 10500, 0.3)*/});
			}
			else{
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			$barbieBG.css({'backgroundPosition': newPos(-25, windowHeight, pos, 10800, 0.6)/* + ", " + newPos(80, windowHeight, pos, 10800, 0.6) + ", " + newPos(50, windowHeight, pos, 10500, 0.3)*/});
			}
		}
		
		//For Levi view...
		if($leviBG.hasClass("inview")){
			//call the newPos function and change the background position
			$leviBG.css({'backgroundPosition': newPos(100, windowHeight, pos, 12100, 0.4)}); 
		}
		
		//For thanks view...
		if($thanksBG.hasClass("inview")){
			//call the newPos function and change the background position
			$thanksBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 13150, 0.4)}); 
		}
		
		$('#pixels').html(pos); //display the number of pixels scrolled at the bottom of the page
	}
		
	RepositionNav(); //Reposition the Navigation to center it in the window when the script loads
	
	$window.resize(function(){ //if the user resizes the window...
		Move(); //move the background images in relation to the movement of the scrollbar
		RepositionNav(); //reposition the navigation list so it remains vertically central
	});		
	
	$window.bind('scroll', function(){ //when the user is scrolling...
		Move(); //move the background images in relation to the movement of the scrollbar
	});
	
});
