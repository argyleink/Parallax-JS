$(function(){
	var $nav = $( '#nav' );

	$sections.each( function(){
		var  $this = $( this )
		  , sTitle = $this.attr( 'data-nav' ) || $this.find( 'h2:first' ).text()
		  ,    sId = $this.attr( 'id' ).split( '-' ).pop();

		$nav.append( '<li><h1><span>' + sTitle + '</span></h1><a href="#' + sId + '">' + sId + '</a></li>' )
	} );

	$nav
		.on( 'click', 'a', function(){
			scrollToSection( $( this ).attr( 'href' ).substr( 1 ) );
		} )
		.on( 'mouseenter', 'li', function(){
			$( this ).find( 'h1' ).stop().show().animate({ opacity:1, duration: 100, left: 30 }, { queue: false });
		} )
		.on( 'mouseleave', 'li', function(){
			var self = this;
			$( this ).find( 'h1' ).stop().animate({ opacity:0, duration: 100, left: 15 }, { queue: false, complete : function(){ $( this ).hide(); } });
		});

	$( 'body' ).on( 'click', 'a', function( ev ){
		var href = this.getAttribute( 'href' );

		if( href.indexOf( '#' ) === 0 ){
			ev.preventDefault();
			scrollToSection( href.substr( 1 ) );
		}
	} );
});