$(function(){
	var     $window = $( window )
	  ,       $body = $( 'body' )
	  ,    $content = $( '#content' )
	  ,   $sections = $content.find( 'section' )
	  ,   $scroller = $( '#mock-scroller' )
	  , fScrPercent = 0
	  ,  aAnimProps = [ 'opacity', 'left', 'top', 'width', 'height', 'background-position' ]
	  , iAnimTimeout, iWindowHeight, aAnimations, sLastHash
	  ;

	// find all animatable nodes and store properties
	$sections.each( function( ix ){
		var $sec = $sections.eq( ix );
		$sec.data( '$pNodes' , $sec.find( '.animate' ) );
		$sec.data( 'bSection', true );

		$sec.add( $sec.data( '$pNodes' ) ).each( function(){
			var $this = $( this )
			  , oData = $this.data()
			  ;

			oData.iPause    = 0 | $this.attr( 'anim-pause' );
			oData.bDetached = !!~'1 true'.indexOf( $this.attr( 'anim-detached' ) );
			oData.fSpeed    = parseFloat( $this.attr( 'anim-speed' ) ) || 1;
			oData.onFocus   = $this.attr( 'anim-focus-handler' );
			oData.onBlur    = $this.attr( 'anim-blur-handler' );
		} );

		// remove the section from the DOM
		$sec.detach();
	} );

	// converts a unit string to px
	function parseUnit( vVal, $node, sValFn ){
		var  aVal = /(-?\d+)(.*)/.exec( vVal )
		  , fUnit = parseFloat( aVal[ 1 ] )
		  , sUnit = aVal[ 2 ]
		  ;

		switch( sUnit ){
			case '':
			case 'px':
				return fUnit;

			case '%':
				return $node[ sValFn ]()  * fUnit / 100;

			default:
				throw new Error( 'Unexpected unit type: ' + sUnit );
				return;
		}
	}

	// reads all listed css properties from $node with sClass applied
	function readCSSProps( $node, sClass ){
		var oObj = {}
		  , i, l, vPropVal, sProp
		  ;

		$node.addClass( sClass );

		for( i=0, l=aAnimProps.length; i<l; i++ ){
			sProp = aAnimProps[i];
			switch( sProp ){
				// numeric css
				case 'opacity':
					vPropVal = 0 | $node.css( sProp );
					break;

				// numeric position
				case 'left':
				case 'top':
					vPropVal = $node.position()[ sProp ];
					break;

				// numeric size
				case 'width':
				case 'height':
					vPropVal = $node[ 'outer' + sProp.substr( 0, 1 ).toUpperCase() + sProp.substr( 1 ) ]();
					break;

				// split numeric properties
				case 'background-position':
					vPropVal = $node.css( sProp ).split( ' ' );
					vPropVal[0] = parseUnit( vPropVal[0], $node, 'outerWidth'  );
					vPropVal[1] = parseUnit( vPropVal[1], $node, 'outerHeight' );
					break;
			}

			oObj[ sProp ] = vPropVal;
		}

		$node.removeClass( sClass );

		return oObj;
	}

	// determines if two values are equal if they are basic types or arrays
	function eq( vVal1, vVal2 ){
		var i, l;

		if( vVal1 === vVal2 ){ return true; }
		if( typeof vVal1 !== typeof vVal2 ){ return false; }

		if( vVal1.length && vVal1.splice && vVal2.length && vVal2.splice ){
			if( vVal1.length != vVal2.length ){ return false; }

			for( i=0, l=vVal1.length; i<l; i++ ){
				if( !eq( vVal1[i], vVal2[i] ) ){
					return false;
				}
			}

			return true;
		}

		return false;
	}

	// returns properties that differ between two objects
	function propDiff( oProps1, oProps2 ){
		var oDiff = {}
		  , n, bProp;

		for( n in oProps2 ){
			if( !eq( oProps1[n], oProps2[n] ) ){
				oDiff[n] = bProp = [ oProps1[n], oProps2[n] ];
			}
		}

		return bProp && oDiff;
	}

	// given a node, top & stage, stores an animation for the node
	function addDiffAnimation( $node, iTop, iStage, iAnimLength ){
		var      stages = [ 'start', 'focus', 'to', 'end' ]
		  , iStartStage = iStage - 1
		  ,   sEndStage = stages[ iStage ]
		  ,   oPropsEnd = readCSSProps( $node, sEndStage )
		  ,       oData = $node.data()
		  , oPropDiff, n, iDiff
		  ;

		if( !iAnimLength ){ iAnimLength = 0; }

		// get the diff between this stage and the most recent prior one with a change
		//while( !( 
			oPropDiff = propDiff( readCSSProps( $node, stages[ iStartStage ] ), oPropsEnd );
		//) && iStartStage-- );

		if( !oPropDiff ){ return 0; }

		for( n in oPropDiff ){
			iDiff = Math.abs( oPropDiff[n][1] - oPropDiff[n][0] );
			if( iDiff > iAnimLength ){ iAnimLength = iDiff; }
		}

		aAnimations.push( {
			     $node : $node
			,   oProps : oPropDiff
			,     iTop : iTop
			,  iBottom : iTop + iAnimLength
			, bSection : oData.bSection
		} );

		return oData.bDetached ? 0 : iAnimLength;
	}

	// window loaded or re-sized, re-calculate all dimensions
	function measureAnimations(){
		var         iTop = 0
		  ,  iStartTimer = +new Date()
		  , iLastSection = $sections.length - 1
		  ,  iPageHeight = 0
		  , oAnim, oData
		  ;

		aAnimations = [];
		$scroller.css( 'height', 10000 );

		// add animations for each section & .animate tag in each section
		$sections.each( function( ix ){
			var       $sec = $( this )
			  ,      oData = $sec.data()
			  ,    $pNodes = oData.$pNodes
			  , iSecHeight = 0
			  ,  iMaxPause = oData.iPause
			  , i, l, iAnimSize, $pNode
			  ;

			oData.startsAt = iTop;

			// append section to content and reset position
			$sec
				.css({ top : '' })
				.appendTo( $content );

			if( ix ){
				iSecHeight = addDiffAnimation( $sec, iTop, 1 );
			}

			for( i=0, l=$pNodes.length; i<l; i++ ){
				$pNode = $pNodes.eq( i );
				iMaxPause = Math.max(
					  iMaxPause
					,             addDiffAnimation( $pNode, iTop                         , 1, iSecHeight )
					, iAnimSize = addDiffAnimation( $pNode, iTop + iSecHeight            , 2, iSecHeight )
					,             addDiffAnimation( $pNode, iTop + iSecHeight + iAnimSize, 3, iSecHeight )
				);
			}

			if( ix ){
				iTop += iMaxPause;
			}

			addDiffAnimation( $sec, iTop + iSecHeight, 2 );

			if( ix < iLastSection ){
				addDiffAnimation( $sec, iTop + iSecHeight, 3 );
			}

			$sec.detach();

			oData.endsAt = iTop += iSecHeight;
		} );

		// wipe start/end positions on sections
		for( i=0, l=$sections.length; i<l; i++ ){
			$sections.eq(i).data().iTop    = Infinity;
			$sections.eq(i).data().iBottom = -Infinity;
		}

		// post-process animations
		for( i=0, l=aAnimations.length; i<l; i++ ){
			oAnim = aAnimations[i];

			if( oAnim.iBottom > iPageHeight ){
				iPageHeight = oAnim.iBottom;
			}

			if( oAnim.bSection ){
				oData = oAnim.$node.data();
				if( oAnim.iTop < oData.iTop ){
					oData.iTop = oAnim.iTop;
				}

				if( oAnim.iBottom > oData.iBottom ){
					oData.iBottom = oAnim.iBottom;
				}
			}
		}
		$scroller.css( 'height', iPageHeight );
window.$sections = $sections;
window.aAnimations = aAnimations;
		console.log( 'measurements took ' + ( new Date() - iStartTimer ) + 'ms' )
	}

	function onResize(){
		measureAnimations();
		onScroll();
	}

	function singlePartialCSSProp( iScrTop, oAnim, oProp ){
		return ( iScrTop - oAnim.iTop ) / ( oAnim.iBottom - oAnim.iTop ) * ( oProp[1] - oProp[0] ) + oProp[0];
	}

	function partialCSSProp( iScrTop, oAnim, oProp ){
		if( oProp[0].splice ){
			return $.map( oProp[0], function( nul, ix ){
				return ( 0|singlePartialCSSProp( iScrTop, oAnim, [ oProp[0][ix], oProp[1][ix] ] ) ) + 'px';
			} ).join( ' ' );
		}else{
			return singlePartialCSSProp( iScrTop, oAnim, oProp );
		}
	}

	function onScroll(){
		var iScrTop = $window.scrollTop()
		  , i, l, oAnim, $sec, oData
		  , bChangedLoc = false
		  , $node, sSecId, n, oCssProps, oProps
		  ;

		if( iScrTop < 0 ){ iScrTop = 0; }

		// hide/show sections
		for( i=0, l=$sections.length; i<l; i++ ){
			$sec  = $sections.eq(i);
			oData = $sec.data();

			if( ( oData.iTop <= iScrTop ) && ( oData.iBottom >= ( iScrTop/* + iWindowHeight*/ ) ) ){
				if( !oData.bVisible ){
					$sec.appendTo( $content );
					oData.bVisible = true;
				}
				if( !bChangedLoc ){
					if( sLastHash != ( sSecId = $sec.attr( 'id' ) ) ){
						/*location.replace*/( '#' + ( sLastHash = sSecId ) );
					}
					bChangedLoc = true;
				}
			}else{
				if( oData.bVisible ){
					$sec.detach();
					oData.bVisible = false;
				}
			}
		}

		for( i=0, l=aAnimations.length; i<l; i++ ){
			oAnim = aAnimations[i];
			$node = oAnim.$node;

			if( ( oAnim.iTop > iScrTop ) || ( oAnim.iBottom < iScrTop ) ){ continue; }

			// in the middle of an animation
			oCssProps = {};
			oProps = oAnim.oProps;
			for( n in oProps ){
				oCssProps[n] = partialCSSProp( iScrTop, oAnim, oProps[n] );
				//oCssProps[n] = 0|-( ( iScrTop - oProps[n][0] ) / ( oProps[n][1] - oProps[n][0] ) * ( oProps[n][1] - oProps[n][0] ) + oProps[n][0] );
			}
			$node.css( oCssProps );
		}
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
			iAnimTimeout = setTimeout( onResize, 50 );

			iWindowHeight = $window.height();
		})
		.trigger( 'resize' )
		.bind( 'scroll', onScroll );
});