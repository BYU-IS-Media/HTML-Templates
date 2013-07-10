/*! 

* @fileOverview Script.js
* @version 2.0
* 
* @author BYU Web Community
* @see https://github.com/byuweb/
* @see https://github.com/byuweb/byu-responsive-dev/
* @see https://github.com/byuweb/byu-responsive-dev/blob/gh-pages/src/js/script.js
*/






// Document ready
$(function(){

	getWidth();
	$(window).resize(getWidth);

	loadSearch();
	activateMenus();

});


/* Func: getWidth
 * Desc: Get the current width of the browser window
 * Args: none
 */
function getWidth() {
	var w = $(window).width();
	log(w);
	return w;
}


/* Func: ActivateMenus
 * Desc: Get the menus going
 * Args: none
 */
function activateMenus() {
	$('#search-menu').delegate('.menu-button', 'click', function (e) {
		e.stopPropagation();
		e.preventDefault();
		$('body').toggleClass('sideNav');
	});

	$('nav li:has(.mega, .sub) > a').click(function (e) {
		e.preventDefault();
		var li = $(this).parent();
		// Only close menu if user clicked to open it
		if (li.hasClass('hover') && clickOpened) {
			li.removeClass('hover');
		}
		else {
			li.addClass('hover');
			$('nav li').not(li).removeClass('hover');
			clickOpened = true;
		}
		return false;
	});

	$('nav li:has(.mega, .sub)').click(function (e) {
		e.stopPropagation();
	});

	//$('#secondary-nav > ul > li, #primary-nav > ul > li').hoverIntent(byuMenuConfig);
	$('nav.no-js').removeClass('no-js');

	/* Positions menu divs */
	$('nav li .sub').each(function () {
		var mega = $(this);
		var left = mega.parent().position().left;
		if (left > mega.parent().parent().outerWidth() - mega.outerWidth())
			mega.css('right', 0);
	});

//Listener for if screen is resized to close sideNav
$(window).resize(function (){
if ($(window).width() > 768){
	$('body').removeClass('sideNav');
}
});

}

/**
 * function set display to none if the Google CSE loads via jQuery
 */
function hideSearch() {
	$('#basic-search').hide();
}


/**
* Loads the Google Custom Search
*/
function loadSearch(){
		log('Load search');
		window.__gcse = {
			callback: hideSearch
		};

		(function() {
			var cx = '009932716493032633443:hlqjz33kfkc';
			var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
			gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
				'//www.google.com/cse/cse.js?cx=' + cx;
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(gcse, s);
			hideSearch();
		})();
}


/** Func: SetPrimaryNavPosition
 * Desc: Move the nav around so it works in the sidebar
 * Args: none
 */
function setupNavPosition() {
	//$('#main-header').append('<div class="nav-container"></div>');
	//$('#secondary-nav, #primary-nav').detach().appendTo('.nav-container');
}


/** Func: RollOver
* Desc: Show a dropdown menu on rollover. Called by the hoverIntent function.
* Args: @evt	- Event object. Automatically generated.
*/
function rollOver(evt) {
	if (!$(this).hasClass('hover')) {
		clickOpened = false;
		$(this).addClass('hover');
		$('nav li').not(this).removeClass('hover');
		$(document).click(hideAllMenus);
	}
}

/** Func: RollOut
* Desc: Hide a dropdown menu on rollout. Called by the hoverIntent function.
* Args: -
*/
function rollOut() {
	$(this).removeClass('hover');
}

/** Func: HideAllMenus
* Desc: Hide all dropdown menus. Bound to click action.
* Args: -
*/
function hideAllMenus() {
	$('nav li').removeClass('hover');
	$(document).unbind('click');
}

function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}




