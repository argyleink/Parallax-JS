// location.replace( '#id' ) -- changes hash URI without history state

$(function(){
	var animations = []
	  ,  $animTags = $( 'animation' )
	  ,  $scroller = $( '#mock-scroller' )
	  ,   $content = $( '#content' )
	  ,  ttlHeight = 0
	  , i, l, j, m, anim, attr, windowHeight, $anim;

	for( i=0, l=$animTags.length; i<l; i++ ){
		$anim = $( $animTags[i] );
		anim  = {
			     from : {}
			,      to : {}
			, domNode : $anim.parent()
			, thisAnim: $animTags[i]
		};

		for( j=0, m=$anim[0].attributes.length; j<m; j++ ){
			attr = $anim[0].attributes[j].name;

			switch( attr ){
				case 'delay':
					anim.delay = parseInt( $anim.attr( attr ) );
					break;

				default:
					anim.to  [ attr ] = $anim.attr( attr );
					anim.from[ attr ] = anim.domNode.css( attr );
					break;
			}
		}

		animations.push( anim );
	}

	function reCalcHeight(){
		ttlHeight = 0;
		for( i=0, l=animations.length; i<l; i++ ){
			anim = animations[i];

			anim.top    = ttlHeight;
			anim.height = parseInt( anim.domNode.outerHeight() );
			ttlHeight  += anim.height + ( anim.delay || 0 );
		}
	}

	$( window )
		/**
		 * On resize:
		 * 
		 * - save window height for onscroll calculations
		 * - re-calculate the height of all the <section> elements
		 * - adjust top position so that it's at the same %, not same px
		 **/
		.bind( 'resize', function(){
			windowHeight = $( window ).height();
			reCalcHeight();
		})
		.trigger( 'resize' );

	$scroller
		.bind( 'scroll', function( ev ){
			var scrTop = $scroller.scrollTop();

/*
on scroll:

loop each element that has any animation
- if element is on screen ( top < window.scrollTop + window.height ) && ( bottom > window.scrollTop )
	- set .css() of the item to ( end - start ) * percentScrolledOfItem
 */

			for (var i=0, l=animations.length; i<l; i++ ){
				var       anim = animations[i]
				  ,     value1 = ( anim.top + windowHeight )
				  ,     value2 = ( anim.top - anim.height )
				  , scrPercent = ( scrTop - value2 ) / ( value1 - value2 );

				if ( ( anim.top < ( scrTop + windowHeight ) ) && ( ( anim.top + anim.height ) > scrTop ) ) {
					// determine % between ( anim.top + windowHeight ) & ( anim.top - anim.height )
					//                     ( 1000     + 500          )   ( 1000     - 500         )
					//                     1500 -- 500
					//                     % = ( 1200 - 500 ) / ( 1500 - 500 )
					//                     % = ( 700 / 1000 ) = .7
					// scrTop = 1200
					// anim.top = 1000
					// anim.height = 500
					// windowHeight = 500

					// create empty object to hold new css properties: {}
					// for each thing in anim.from
						// set new object.property = ( to - from ) * percent + from

				var newFrom = {};
				for( i in anim.from ){
					newFrom[i] = (anim.to[i] - anim.from[i]) * (scrPercent + anim.from[i]);

					}
					anim.from = newFrom;
				}
			}
		} );
});