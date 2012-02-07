/* Initialize */

jQuery(
  
  function ($) {

    $.Body = $('body');
    
    $.Window = $(window);
    
    $.Scroll = ($.browser.mozilla || $.browser.msie) ? $('html') : $.Body;
    
    $.Mobile = ($.Body.hasClass('webkit-mobile') || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))),
    
    $.Unsupported = $.Body.hasClass('unsupported-browser');
    
/*    $.Body
    .Keyboard()
    .Omniture();*/
    
    $('[data-controller]').Instantiate();

    // Draw Lines
    // Bug with IE canvas implementation requires onload
/*    if ($.browser.msie)
      $(window).bind('load',function(){$('[data-canvasline]').Line();})
    else
      $('[data-canvasline]').Line();
    
    $('[data-target=_blank]').TargetBlank();*/
    
  } 
  
);

/* ---------------------------------- */

/* Events */

(function($) {

  $.Events = {

     /*OMNITURE_TRACK: 'omnitureTrack',
     OMNITURE_TRACK_LINK: 'omnitureTrackLink',*/
     
     
     SECTION_ENTER: 'sectionEnter',
     
     SCROLL_TO: 'scrollTo',
     
     SCROLL: 'windowScroll',
     SCROLL_ENTER: 'windowScrollEnter',
     SCROLL_LEAVE: 'windwScrollLeave',
     
     KEY_UP: 'keyUp',
     KEY_DOWN: 'keyDown',
     KEY_LEFT: 'keyLeft',
     KEY_RIGHT: 'keyRight',
     KEY_ESC: 'keyEsc',
     KEY_SPACE: 'keySpace',
     
     
     PROOF_POINT: 'proofPointMore'
    
  
  } // Events  
  
  $.Views = {
  
  
  } // Views 

   
  
})(jQuery);


/* ---------------------------------- */

/* Auto Instantiate */

(function($) {

  $.fn.Instantiate = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function() { 

          var $self = $(this),
              $controller = $self.attr('data-controller');
                  
          if ($self[$controller])
            $self[$controller]();
              
      });
      
  }
    
  

})(jQuery);


/* ---------------------------------- */

/* MainNav */

(function($) {

  
   $.fn.MainNav = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $ul = $('<ul/>').appendTo($self),
            $sections = $('[data-nav]'),
            _sections = new Array(),
            $navs = new Array(),
            _active = 0;
            
            
       if (!$.Mobile && !$.Unsupported) { 
        $sections.each(
          function(i){
            _sections.push($(this))
            $('<li/>').appendTo($ul).DotNav({id:$(this).attr('id'),name:$(this).attr('data-nav')});
        
          })
          
        $self.css({marginTop:-$self.height()/2})
        
        }
        
        $.Body
          .bind($.Events.SECTION_ENTER,
            function(e,id){
              
              $sections.each(
                function(i){
                  if ($(this).attr('id')==id)
                    _active = i;
              
                })
            
            })
          .bind($.Events.KEY_RIGHT,
            function(e){
              _active++;
              if (_active>$sections.length-1)
                _active=$sections.length-1;
              _seek();
          })
          .bind($.Events.KEY_LEFT,
            function(e){
              _active--;
              if (_active<0)
                _active=0;
              _seek()
              
          })
          
          
          function _seek() {
            $.Body.triggerHandler($.Events.SCROLL_TO,_sections[_active].attr('id'))
          }
        
            
     });
     
    return this;
     
  } // Main Nav
  
  $.fn.DotNav = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
   
     this.each(function() { 
      
        var $self = $(this),
            $a = $('<a/>'),
            $h1 = $('<h1/>').appendTo($self),
            $span = $('<span/>').html(config.name).appendTo($h1),
            $id = config.id;
		var $homeBubble = $("li[data-id='story-header'] h1");
			if($('section#story-header').hasClass('inview')){
				$homeBubble.css({'display':'block', 'left':30, 'opacity':1});
				}
			

            $a
              .attr('href',"#/"+config.name.split(' ').join('_'))
              .html($id)
              .appendTo($self)
              .bind('click',
                function(e){
                  
                  $.Body.triggerHandler($.Events.SCROLL_TO,$id)
                 
                  e.preventDefault();
				  
				  
                  
                })
            
            $self
              .attr('data-id',$id);
              
        $a
          .bind('mouseenter',
            function(e) {
              if ($('._playing').length==0)
			  if ($homeBubble.is(':visible'))
			    $homeBubble.stop().animate({left:15,opacity:0},450,'easeOutQuart',function(){$homeBubble.stop().css({display:'none'})})
              if ($.browser.msie)
                $h1.stop().css({display:'block',left: 30, opacity:1})
              else
                $h1.stop().css({display:'block'}).animate({left:30,opacity:1},450,'easeOutQuart')
			  
			  	
            })
          .bind('mouseleave',
            function(e) {
              if ($.browser.msie)
                $h1.stop().css({display:'none',left: 30})
              else
                $h1.stop().animate({left:15,opacity:0},450,'easeOutQuart',function(){$h1.stop().css({display:'none'})})
            });
            
            
        $.Body
          .bind($.Events.SECTION_ENTER,
            function(e,id){
              if (id==$id)
                $self.addClass('active')
              else
                $self.removeClass('active')
              
              
              
            
            });
        
            
     });
     
    return this;
     
  } // DotNav

    
    
			
			
           
    
})(jQuery);

/* SiteScroll */

(function($) {

  
   $.fn.SiteScroll = function() {
   
     this.each(function() { 
      
        var $self = $(this);
            
        $.Body
          .bind($.Events.SCROLL_TO,
            function(e,id){
            
              var $element = $('#'+id),
                  $header = $element.find('header'),
                  _align = $element.attr('data-align'),
                  _offset = $element.attr('data-scrolloffset') ? parseInt($element.attr('data-scrolloffset')) : 50,
                  _top = $element.offset().top;
              
              
              if ($header.length>0 && _align!="top") { 
                  
                  _top = $header.offset().top  + $header.height()/2 - $.Window.height()/2;
              
              
                  if (_top > $header.offset().top)
                    _top = $header.offset().top - 50
                
              }
              
              if (_align=="center" && $element.height()>$.Window.height()) {
              
                _top = $element.offset().top + ($element.height()-$.Window.height())/2
              
              }
              
            
              
              $.Scroll
                .stop()
                .animate(
                  { 'scrollTop': _top },
                  800,
                  'easeInOutQuart'
                )
                
              
              
            })
        
            
     });
     
    return this;
     
  }
    
   
    
})(jQuery);

/* ---------------------------------- */

/* Scrollable */

(function($) {

  
  $.fn.Scrollable = function(settings) {
   
     var config = { threshold: -100, offset_scroll: 6, offset_intertia: .15 };
 
     if (settings) $.extend(config, settings);
    
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id');
            
        config.threshold = 0
        
        if ($.Mobile || $.Unsupported) {  
          $self.css({backgroundAttachment:'scroll'})
        }else{
        
        $.Window
          .bind('scroll',
            function(e){
            
              if ( $.inview($self,{threshold:config.threshold}) ) {
                
                if (!$self.hasClass('_active')){
                
                  $self.addClass(/*'_active'*/);
                  
                  if (config.is_nav)
                    $.Body.triggerHandler($.Events.SECTION_ENTER,$id);
                  
                  $self.triggerHandler($.Events.SCROLL_ENTER);
                  
                }
                  
                _scroll_background();
                  
                $self.triggerHandler($.Events.SCROLL,$.distancefromfold($self,{threshold:config.threshold}) - config.threshold)
                
              }else{
                
                if ($self.hasClass('_active')){
                
                  $self.removeClass('_active');
                  
                  $self.triggerHandler($.Events.SCROLL_LEAVE);
                  
                }
              
              }
              
            
            })
            
            
        }
        
        function _scroll_background() {

          var _x = '50% '
                  
          var bpos = _x + (-($.distancefromfold($self,{threshold:config.threshold}) - config.threshold) * config.offset_intertia) + 'px';
          
          $self.css({'backgroundPosition':bpos})

        }
        
        /*if (config.auto_scroll)
          _scroll_background();*/
            
     });
     
    return this;
     
  } //Story
  
  
  $.fn.StoryHeader = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

            
     });
     
    return this;
     
  } //StoryHeader
  
  $.fn.StoryVideo = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

            
     });
     
    return this;
     
  } //StoryVideo
  
 $.fn.StoryOffices = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

            
     });
     
    return this;
     
  } //StoryOffices
  
  $.fn.StoryIntel = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

            
     });
     
    return this;
     
  } //StoryIntel
  
  $.fn.StoryWilliam = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

            
     });
     
    return this;
     
  } //StoryWilliam

  $.fn.StoryBing = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

            
     });
     
    return this;
     
  } //StoryBing
 
   $.fn.StoryBestBuy = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

            
     });
     
    return this;
     
  } //StoryBestBuy
  
    $.fn.StoryNike = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

            
     });
     
    return this;
     
  } //StoryNike

   $.fn.StoryKeystone = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

            
     });
     
    return this;
     
  } //StoryKeystone
  
     $.fn.StoryMercedes = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

            
     });
     
    return this;
     
  } //StoryMercedes
  
     $.fn.StoryBarbie = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

            
     });
     
    return this;
     
  } //StoryBarbie
  
     $.fn.StoryLevi = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

            
     });
     
    return this;
     
  } //StoryLevi
  
     $.fn.StoryThanks = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

            
     });
     
    return this;
     
  } //StoryThanks






})(jQuery);//Scrollable


/* Worker */

(function($) {


    $.distancefromfold = function($element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).height() + $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return (fold + settings.threshold) - $element.offset().top ;
    };
    
    $.belowthefold = function($element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).height() + $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $element.offset().top - settings.threshold;
    };
    
    $.rightoffold = function($element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).width() + $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $element.offset().left - settings.threshold;
    };
        
    $.abovethetop = function($element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top;
        }
        return fold >= $element.offset().top + settings.threshold  + $element.height();
    };
    
    $.leftofbegin = function($element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left;
        }
        return fold >= $element.offset().left + settings.threshold + $element.width();
    };
    
    $.inview = function($element, settings) {
        return ($.abovethetop($element,settings)!=true && $.belowthefold($element,settings)!=true)
    };


    $.extend($.expr[':'], {
        "below-the-fold" : "$.belowthefold(a, {threshold : 0, container: window})",
        "above-the-fold" : "!$.belowthefold(a, {threshold : 0, container: window})",
        "right-of-fold"  : "$.rightoffold(a, {threshold : 0, container: window})",
        "left-of-fold"   : "!$.rightoffold(a, {threshold : 0, container: window})"
    });
    
})(jQuery);   
















