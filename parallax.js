// location.replace( '#id' ) -- changes hash URI without history state

$(function(){
	var     $window = $( window )
	  ,       $body = $( 'body' )
	  ,    $content = $( '#content' )
	  ,   $sections = $content.find( 'section' )
	  ,   $scroller = $( '#mock-scroller' )
	  , fScrPercent = 0
	  ,  aAnimProps = [ 'opacity', 'left', 'top', 'background-position' ]
	  , iAnimTimeout, iWindowHeight, aAnimations
	  ;

	// find all animatable nodes and store properties
	$sections.each( function( ix ){
		var $sec = $sections.eq( ix );
		$sec.data( 'p-nodes', $sec.find( '.animate' ) );

		$sec.add( $sec.data( 'p-nodes' ) ).each( function(){
			var $this = $( this )
			  , oData = $this.data()
			  ;

			oData.iPause    = 0 | $this.attr( 'anim-pause' );
			oData.bDetached = !!~'1 true'.indexOf( $this.attr( 'anim-detached' ) );
			oData.onFocus   = $this.attr( 'anim-focus-handler' );
			oData.onBlur    = $this.attr( 'anim-blur-handler' );
		} );

		// remove the section from the DOM
		$sec.detach();
	} );

	// window loaded or re-sized, re-calculate all dimensions
	function measureAnimations(){
		var iTop = 0;
		aAnimations = [];

		$sections.each( function( ix ){
			var       $sec = $( this )
			  ,      oData = $sec.data()
			  , iSecHeight = 0
			  ;

			oData.startsAt = iTop;

			// append section to content and reset position
			$sec
				.css({ top : 0 })
				.appendTo( $content );

			iSecHeight += $sec.outerHeight();

			$sec.detach();

			oData.endsAt = iTop += iSecHeight;
		} );
	}

	$window
		/**
		 * On resize:
		 * 
		 * - save window height for onscroll calculations
		 * - re-calculate the height of all the <section> elements
		 * - adjust top position so that it's at the same %, not same px
		 **/
		.bind( 'resize', function(){
			if( iAnimTimeout ){ clearTimeout( iAnimTimeout ); }
			iAnimTimeout = setTimeout( measureAnimations, 50 );

			iWindowHeight = $window.height();
		})
		.trigger( 'resize' );

	$scroller
		.bind( 'scroll', function( ev ){
			var scrTop = $scroller.scrollTop();
		} );
});