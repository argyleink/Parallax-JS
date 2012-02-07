/* ---------------------------------- */

/*
 * Nike Better World
 * 2011
 *
 * com.nikebetterworld.js
 *
 * 
 */
 
 
/* ---------------------------------- */

/*
 *  TABLE OF CONTENTS
 *  
 *  @Initialize
 *  @Events
 *  @AutoInstantiate
 *  @Omniture
 *  @ProofPoints
 *  @Line
 *  @Scrollable
 *  @Stories
 *  @MainNav
 *  @Counter
 *  @SiteScroll
 *  @TargetBlank
 *  @Keyboard
 *  @Worker Methods
 *
 */
 
/* ---------------------------------- */

/* Initialize */

jQuery(
  
  function ($) {

    $.Body = $('body');
    
    $.Window = $(window);
    
    $.Scroll = ($.browser.mozilla || $.browser.msie) ? $('html') : $.Body;
    
    $.Mobile = ($.Body.hasClass('webkit-mobile') || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))),
    
    $.Unsupported = $.Body.hasClass('unsupported-browser');
    
    $.Body
    .Keyboard()
    .Omniture();
    
    $('[data-controller]').Instantiate();

    // Draw Lines
    // Bug with IE canvas implementation requires onload
    if ($.browser.msie)
      $(window).bind('load',function(){$('[data-canvasline]').Line();})
    else
      $('[data-canvasline]').Line();
    
    $('[data-target=_blank]').TargetBlank();
    
  } 
  
);

/* ---------------------------------- */

/* Events */

(function($) {

  $.Events = {

     OMNITURE_TRACK: 'omnitureTrack',
     OMNITURE_TRACK_LINK: 'omnitureTrackLink',
     
     
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

/* Omniture */

(function($) {

  $.fn.Omniture = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function() { 

        var $self = $(this),
            $track = $('[data-omniture]').OmnitureTrack()
            $exits = $('[data-omniturelink]').OmnitureTrackLink();
        
        
        $.Body
          .bind($.Events.OMNITURE_TRACK,
            function(e,id) {
              trackContent('http://www.nikebetterworld.com/'+id)
            })
          .bind($.Events.OMNITURE_TRACK_LINK,
            function(e,url) {
              trackExit(url)
            })
            
    
        
              
      });
      
      
      return this;
  }
  
  $.fn.OmnitureTrack = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function() { 

        var $self = $(this),
            $id = $self.attr('data-omniture');
        
        
        $self
          .Scrollable({})
          .bind($.Events.SCROLL_ENTER,
            function(e) {
              _track($id)
            })
            
        
        function _track(id) {
          $.Body.triggerHandler($.Events.OMNITURE_TRACK,id);
        }
        
        
              
      });
      
      
      return this;
  }
  
  $.fn.OmnitureTrackLink = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function() { 

        var $self = $(this),
            $id = $self.attr('href');
        
        
        $self
          .bind('click',
            function(e) {
              _track($id)
            })
            
        
        function _track(id) {
          $.Body.triggerHandler($.Events.OMNITURE_TRACK_LINK,id);
        }
        
        
              
      });
      
      
      return this;
  }


})(jQuery); 



/* ---------------------------------- */

/* Shell */

(function($) {

  $.fn.SHELL = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function() { 

              
      });
      
      
      return this;
  }

})(jQuery); 

/* ---------------------------------- */

/* ProofPoints */

(function($) {

  $.fn.ProofPoints = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function() { 

        var $self = $(this),
            $id = $self.attr('id'),
            $points = $self.find('[data-proofpoint]'),
            $points_container = $self.find('.proof-points-container'),
            $more = $self.find('nav.more a'),
            _active = 0;
            
        
        $self.Scrollable({is_nav:true})
        
        /*$.Window
          .bind('scroll',
            function(){
              
              if ( $.inview($self,{threshold:0}) ) {
              
                if (!$self.hasClass('active')) {
                
                  $self.addClass('active');
                  
                  $.Body.triggerHandler($.Events.SECTION_ENTER,$id);
                }
              
              }else{
              
                $self.removeClass('active');
                
              }
              
            })*/
        
        $points.ProofPoint({owner:$self})
        
        $more
          .bind('mousedown',
            function(e){
              $more.addClass('_down');
            })
          .bind('mouseup',
            function(e){
              $more.removeClass('_down');
            })
          .bind('click',
            function(e){
              
              _active++;
              
              if(_active>$points.length-1)
                _active=0;
              
              var dir = (_active==0) ? -1 : 1;
              
              $self.triggerHandler($.Events.PROOF_POINT,[_active,dir])
              
              $points_container.stop().animate({marginTop:-_active*600},850,'easeOutExpo')
              
              e.preventDefault();
              
            })
        
       
              
      });
      
      
      return this;
      
  } //ProofPoint
  

  $.fn.ProofPoint = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function(index) { 

        var $self = $(this),
            $h1 = $self.find('h1'),
            $headline = $self.attr('data-share'),
            $summary = $self.find('p').html(),
            $copy = $self.find('section.proof-description'),
            $icons = $('<aside/>').appendTo($copy),
            _heading = $h1.html();
            
        $self.css({left:index*500})
          
        config.owner
          .bind($.Events.PROOF_POINT,
            function(e,i,dir){
              
              if (i==index)
                _show(dir);
              else
                _hide(dir);
                
              
            });
      

       
       function _show(dir) {
       
        $self.stop().animate({opacity: 1},800,'easeOutExpo')
        
        $.Body.triggerHandler($.Events.OMNITURE_TRACK,'proofpoint_'+escape($headline))
        
        
       }
       
       function _hide(dir) {
        
        $self.stop().animate({opacity: 0},800,'easeOutExpo')

       }  
        
            
              
      });
      
      
      return this;
  } // ProofPoint

})(jQuery); 


/* ---------------------------------- */

/* Share */

(function($) {

  $.fn.Line = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function() { 
        
        var $self = $(this),
            $canvas = $self.find('canvas'),
            $canvas_id = $canvas.attr('id'),
            $target = $self.attr('data-target'),
            $top = $self.attr('data-top'),
            $coord = $self.attr('data-coord') ? $self.attr('data-coord').split(',') : new Array(0,0,0,0),
            _canvas_element = document.getElementById($canvas_id),
            _canvas_context = _canvas_element.getContext('2d'),
            _height = 0;
        
        $self.css({top: parseInt($top), height: parseInt($coord[3]), marginBottom:0, width: 900,overflow:'hidden'})
        
        $canvas.attr({height: parseInt($coord[3]),width: 900})
        
        $.html5.canvas.draw.dashedline(_canvas_context, parseInt($coord[0]), parseInt($coord[1]), parseInt($coord[2]), parseInt($coord[3]), _canvas_element,6);

      });
      
      
      return this;
  }

})(jQuery); 


/* ---------------------------------- */

/* Line */

(function($) {

  $.fn.Line = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function() { 
        
        var $self = $(this),
            $canvas = $self.find('canvas'),
            $canvas_id = $canvas.attr('id'),
            $target = $self.attr('data-target'),
            $top = $self.attr('data-top'),
            $coord = $self.attr('data-coord') ? $self.attr('data-coord').split(',') : new Array(0,0,0,0),
            _canvas_element = document.getElementById($canvas_id),
            _canvas_context = _canvas_element.getContext('2d'),
            _height = 0;
        
        $self.css({top: parseInt($top), height: parseInt($coord[3]), marginBottom:0, width: 900,overflow:'hidden'})
        
        $canvas.attr({height: parseInt($coord[3]),width: 900})
        
        $.html5.canvas.draw.dashedline(_canvas_context, parseInt($coord[0]), parseInt($coord[1]), parseInt($coord[2]), parseInt($coord[3]), _canvas_element,6);

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
                
                  $self.addClass('_active');
                  
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
  
  $.fn.Video = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $header = $self.find('header'),
            $h1 = $self.find('h1'),
            $h2 = $self.find('h2'),
            $span = $self.find('span'),
            $a_close = $self.find('a#close-video'),
            $id = $self.attr('id'),
            $img = $self.find('img'),
            $a_play = $self.find('a.play-button'),
            $darkslide = $self.find('.darkslide'),
            $container = $self.find('#video-container'),
            _video = $self.attr('data-videoid'),
            _popup = ( $.Unsupported || $.Body.hasClass('browser-ie7') ),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true,auto_scroll:true})
          .bind($.Events.SCROLL,on_scroll)
          .bind($.Events.SCROLL_ENTER,on_scroll_enter)
          .bind($.Events.SCROLL_LEAVE,on_scroll_leave);
          
        $a_play
          .bind('click',
            function(e){
              if (!_popup)
                _show_video();
              else
                _popup_video();
                
              e.preventDefault();
            })

        $h1
          .css({cursor:'pointer'})
          .bind('click',function(){$a_play.triggerHandler('click')})
            
        $a_close 
          .bind('click',
            function(e){
              _close_video();
              e.preventDefault();
            })
               
        function on_scroll(e,distance) {
          
          $span
          .css({marginTop:75-Math.floor(distance/10)})
        
        }
        
        function on_scroll_enter(e) {
        
          
        
        }
        
        function on_scroll_leave(e) {
        
        
          $self.removeClass('_playing');
          
          $container.html('');
          
          $darkslide.stop().css({height:0,opacity:0});
          
        }
        
        function _popup_video() {
        
          //var _v = window.open('video.jsp' ,'_video','width=810,height=456')
          var _v = window.open('video' ,'_video','width=810,height=456')
            
          _v.focus();
        
          _v.moveTo($(window).width()/2 - 405, $(window).height()/2 - 230)


        }
        function _show_video() {
        
          $self.addClass('_playing');
          
          $darkslide.css({height: '100%'}).animate({opacity:.9},800,'easeInOutExpo',_bind_container)
          
          var _scrolltop = $self.offset().top + ($self.height()-$.Window.height())/2;
          
          if ($a_close.offset().top < _scrolltop)
            _scrolltop = $a_close.offset().top;
          
          $.Scroll.animate({scrollTop:_scrolltop},800,'easeInOutExpo')
        }
        
        function _bind_container() {
          $container.html('<object id="myExperience" class="BrightcoveExperience"><param name="wmode" value="transparent" /><param name="bgcolor" value="transparent" /><param name="width" value="810" /><param name="height" value="455" /><param name="playerID" value="713898383001" /><param name="playerKey" value="AQ~~,AAAAEN5stVk~,ClMjWCb9_K5hl9hjtUNJgrjL1gVfknrr" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /><param name="@videoPlayer" value="'+_video+'" /></object><script type="text/javascript">brightcove.createExperiences();</script>');
          
        }
        
        function _close_video() {
        
          $self.removeClass('_playing');
          
          $('#myExperience').remove();
          
          $container.html('');
          
          $darkslide.css({height: '100%'}).animate({opacity:0},1200,'easeInOutQuart',function(){
            $darkslide.css({height: '0'})
          })
          
        }
        
        
            
     });
     
    return this;
     
  } //Video
  
  $.fn.StoryFreeXT = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $header = $self.find('header'),
            $bg = $self.find('.bg'),
            $h1 = $self.find('h1'),
            $h2 = $self.find('h2'),
            $id = $self.attr('id'),
            $img = $self.find('img'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})
          .bind($.Events.SCROLL,on_scroll)
          .bind($.Events.SCROLL_ENTER,on_scroll_enter)
          .bind($.Events.SCROLL_LEAVE,on_scroll_leave);
        
        
          
        function on_scroll(e,distance) {
        
          var bpos = '50% ' + ($.Window.height()/2.5-distance/3) + 'px';
                  
          $bg.css({'backgroundPosition':bpos})
          
        }
        
        function on_scroll_enter(e) {
        
        }
        
        function on_scroll_leave(e) {
        
        }
        
        
            
     });
     
    return this;
     
  } //StoryFreeXT
  
  $.fn.StoryWorldChampionshipJersey = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

            
     });
     
    return this;
     
  } //StoryWorldChampionShip
  
 $.fn.StorySoweto = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            $bg = $self.find('.bg'), 
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})
          .bind($.Events.SCROLL,on_scroll)

          
        function on_scroll(e,distance) {
         
          var bpos = '15% ' + (300+$.Window.height()/2-distance/3) + 'px';
                  
          $bg.css({'backgroundPosition':bpos});
        
        }

            
     });
     
    return this;
     
  } //StorySoweto
   
    
   
  $.fn.StoryNYCBasketball = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

            
     });
     
    return this;
     
  } //StoryNYC Rec
  
  
  $.fn.StoryHomelessWorldCup = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            $bg = $self.find('.bg'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})
          .bind($.Events.SCROLL,on_scroll)
               
        function on_scroll(e,distance) {
          
           var bpos = '90% ' + (200+$.Window.height()/2-distance/3) + 'px';
                  
           $bg.css({'backgroundPosition':bpos})
  
        }
        
            
     });
     
    return this;
     
  } //StoryhomelessWorldCup
  
  
  $.fn.StoryN7 = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

            
     });
     
    return this;
     
  } //StoryN7

   
  $.fn.StoryCardboard = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})

        
            
     });
     
    return this;
     
  } //StoryCardboard
  
  
  $.fn.StoryGreenRubber = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})
        
            
     });
     
    return this;
     
  } //StoryGreenRubber
   
    
    
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
              if ($.browser.msie)
                $h1.stop().css({display:'block',right: 30})
              else
                $h1.stop().css({display:'block'}).animate({right:30,opacity:1},450,'easeOutQuart')
            })
          .bind('mouseleave',
            function(e) {
              if ($.browser.msie)
                $h1.stop().css({display:'none',right: 30})
              else
                $h1.stop().animate({right:15,opacity:0},450,'easeOutQuart',function(){$h1.stop().css({display:'none'})})
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


/* ---------------------------------- */

/* Counter */

(function($) {

  
   $.fn.Counter = function() {
   
     this.each(function() { 
          //this function sets up the footer icons for twitter, facebook and z
        var $self = $(this),
            $mark = $self.find('mark'),
            $share = $('<div/>').addClass('share-counter').appendTo($self),
            $a_fb = $('<a/>').html('Facebook').attr({href:'#/fb','title':'Facebook'}).addClass('icon-fb'),
            $a_twitter = $('<a/>').html('Twitter').attr({href:'#/twitter','title':'Twitter'}).addClass('icon-twitter'),
            $a_orkut = $('<a/>').html('Orkut').attr({href:'#/orkut','title':'Orkut'}).addClass('orkut'), 
            _total = 0;
        
          
          //these 3 variables show the order of how the logos appear. just move the order around to make a change
        //this code is repeated down in the 2nd function below. for the side icons 
    if (com_nbw_lang == 'pt-br') { //notice the language. I will have to make the change to maybe 'en-US' or what ever i need 
                $a_orkut.appendTo($share);
                 }
          //notice i commented out $a_orkut but didnt delete just in case i may need it
    //$a_orkut.appendTo($share)
    $a_fb.appendTo($share);
      $a_twitter.appendTo($share)
          

        $a_fb
          .bind('click',
            function(e){
          
              var _fb = window.open('http://www.facebook.com/sharer.php?s=100&p[url]=http://www.nikebetterworld.com&p[title]='+headline()+'&p[images][0]=http://www.nikebetterworld.com/images/nbw_facebook.png' ,'_fb','width=550,height=450')
              
              _centerPopup(_fb)
              
              $.Body.triggerHandler($.Events.OMNITURE_TRACK,'facebook_scroll')
              
              e.preventDefault();
              
            })
            
        $a_twitter
          .bind('click',
            function(e){
            
              var _tweet = window.open('http://twitter.com/?status='+headline(1) + escape(' #NikeBetterWorld'),'_tweet','width=1024,height=600,scrollbars=yes')
              
              _centerPopup(_tweet)
              
              $.Body.triggerHandler($.Events.OMNITURE_TRACK,'twitter_scroll')
              
              e.preventDefault();
              
            })

//andre test button (icon_share_orkut.png) for the css class "orkut" (this is the first of two button function calls). this is for the footer icon

   $a_orkut
          .bind('click',
            function(e){
          //i am going to need to change this variable "_fb" to "_orkut" in both of my button functions once i get the correct url
              var _orkut = window.open('http://promote.orkut.com/preview?nt=orkut.com&tn=http://www.nikebetterworld.com/images/nbw_facebook.png&tt=Nike%20Better%20World%20&du=http://www.nikebetterworld.com&cn='+headline(),'_orkut','width=550,height=450')
              
              _centerPopup(_orkut)
              
              $.Body.triggerHandler($.Events.OMNITURE_TRACK,'facebook_scroll')
              
              e.preventDefault();
              
            })
//end of andre test


            
        function headline(tw) {
        
          if (com_nbw_lang == 'pt-br') {
            if (tw) {
              return ('Eu rolie ' + $mark.html()  + ' pixels em direcao a um mundo melhor. http://www.nikebetterworld.com');
            }
            else {
              return ('Eu rolie ' + $mark.html()  + ' pixels em dire&ccedil;&atilde;o a um mundo melhor. http://www.nikebetterworld.com');
            }
          }
          else {
            return ('I scrolled ' + $mark.html()  + ' pixels toward a Better World. http://www.nikebetterworld.com');
          }
        
        }

        function _centerPopup(_win) {
       
        _win.focus();
        
        _win.moveTo($(window).width()/2 - 275, $(window).height()/2 - 225)
       
       }
            
                
        
        $.Window
          .bind('scroll',
            function(e){
            
            
              var scrolled = $(window).scrollTop();
              
              if (scrolled>999) {
              
                scrolled = _comma(scrolled.toString());
              
              }
              
              $mark.html(scrolled)
              
              
            
            });
      
        function _comma(nStr){
          nStr += '';
          x = nStr.split('.');
          x1 = x[0];
          x2 = x.length > 1 ? '.' + x[1] : '';
          var rgx = /(\d+)(\d{3})/;
          while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
          }
          return x1 + x2;
        }
        
            
     });
     
    return this;
     
  }
    
   
    
})(jQuery);

/* ---------------------------------- */

/* SiteShare */

(function($) {

  
   $.fn.SiteShare = function() {
      //this is the code for the side buttons icons twitter, facebook & orkut
     this.each(function() { 
      
        var $self = $(this).addClass('active'),
            $share_fb = $self.attr('fb-share'),
            $share_tw = $self.attr('tw-share'),
            $share_ok = $self.attr('ok-share'),
            $footer = $('footer'),
            $video = $('#story-video'),
            $a_fb = $('<a/>').html('Facebook').attr({href:'#/fb','title':'Facebook'}).addClass('icon-fb'),
            $a_twitter = $('<a/>').html('Twitter').attr({href:'#/twitter','title':'Twitter'}).addClass('icon-twitter'),
            $a_orkut = $('<a/>').html('').attr({href:'#/orkut','title':'Orkut'}).addClass('orkut'), 
            _total = 0;
          
        $.Window
          .bind('scroll',
            function() {
            
             
              _adjust_display();

            
            })
            
            

        if (!$.Mobile && !$.Unsupported) {  
//this controlls the side button icon for twitter, facebook and orkut. if you want to move the order of how the icons look just switch the 3 variables around 
          
//this code is repeated above in the 1st function for the footer icons 
    if (com_nbw_lang == 'pt-br') { //notice the language. I will have to make the change to maybe 'en-US' or what ever i need 
                $a_orkut.appendTo($self);
                 }
          //notice i commented out $a_orkut but didnt delete just in case i may need it
        //$a_orkut.appendTo($self)
          $a_fb.appendTo($self)
          $a_twitter.appendTo($self)
        }

        _adjust_display()
                
        $a_fb
          .bind('click',
            function(e){
          
              var _fb = window.open('http://www.facebook.com/sharer.php?s=100&p[url]=http://www.nikebetterworld.com&p[title]='+$share_fb+'&p[images][0]=http://www.betterworld.com/images/nbw_facebook.png' ,'_fb','width=550,height=450')
              
              _centerPopup(_fb)
              
              $.Body.triggerHandler($.Events.OMNITURE_TRACK,'facebook_site')
              
              e.preventDefault();
              
            })

            
        $a_twitter.bind('click', function(e) {
            	
              var _tweet = window.open('http://twitter.com/?status='+$share_tw + escape(' #NikeBetterWorld') +' http://www.nikebetterworld.com','_tweet','width=1024,height=600,scrollbars=yes');
              
              _centerPopup(_tweet)
              
              $.Body.triggerHandler($.Events.OMNITURE_TRACK,'twitter_site')
              
              e.preventDefault();
              
		});

//andre test button orkut (this is the 2nd of two button calls)
    $a_orkut
          .bind('click',
            function(e){
          //i am going to need to change this variable "_fb" to "_orkut" in both of my button functions once i get the correct url
              var _orkut = window.open('http://promote.orkut.com/preview?nt=orkut.com&tn=http://www.nikebetterworld.com/images/nbw_facebook.png&tt=Nike%20Better%20World&du=http://www.nikebetterworld.com&cn='+$share_ok,'_orkut','width=550,height=450')
              
              _centerPopup(_orkut)
              
              $.Body.triggerHandler($.Events.OMNITURE_TRACK,'facebook_site')
              
              e.preventDefault();
              
            })
            
//end of test button orkut

            
       function _centerPopup(_win) {
       
        _win.focus();
        
        _win.moveTo($(window).width()/2 - 275, $(window).height()/2 - 225)
       
       }
       
       function _adjust_display() {
       
          if($.belowthefold($footer,{threshold:0}) && $.abovethetop($video,{threshold:0})){
              
                if (!$self.hasClass('active')) {
                
                  $self.animate({bottom: 25},400,'easeOutQuart')
                
                  $self.addClass('active')
                
                }
                
              }else{
                
                if ($self.hasClass('active')) {
                
                  $self.animate({bottom: -35 },400,'easeOutQuart')
                
                  $self.removeClass('active')
                
                }
                
              }
       
       }
            
                
       
        
            
     });
     
    return this;
     
  }
    
   
    
})(jQuery);


        
/* ---------------------------------- */

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

/* TargetBlank */

(function($) {

  
   $.fn.TargetBlank = function() {
   
     this.each(function() { 
      
        var $self = $(this);
            
        
        $self
        .attr('target','_blank')
        .bind('click',on_click);
        
        function on_click(e){
        
        }
        
            
     });
     
    return this;
     
  }
    
   
    
})(jQuery);
    

/* ---------------------------------- */

/* Keyboard */

(function($) {


   $.fn.Keyboard = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function() { 
      
        var $self = $(this);
      
        $(document)
        .bind('keydown',on_keydown);
        
        function on_keydown(e) {
          
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          
          switch(key) {

             
             case 27: //escape

              $.Body.triggerHandler($.Events.KEY_ESC);
                        
             break;
             
             case 32: //space

              $.Body.triggerHandler($.Events.KEY_SPACE);
                        
             break;
             
             case 38: //top
              
              $.Body.triggerHandler($.Events.KEY_UP);
                        
             break;
           
             case 39: //right

              $.Body.triggerHandler($.Events.KEY_RIGHT);
              e.preventDefault();
              
             break;
             
             case 40: ///bottom
            
              $.Body.triggerHandler($.Events.KEY_DOWN);
                        
             break;
              
             case 37: //left
             
              $.Body.triggerHandler($.Events.KEY_LEFT);
                        
             break;
             
             
          }//switch
          
        }//keydown
  
      }); 
      
      return this;
    
  } 
  

})(jQuery);


/* ---------------------------------- */

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