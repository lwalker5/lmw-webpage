(function($){
	var m = (window.innerHeight - 768)/2 + 'px';
	console.log(m);
	$(".grid-wrapper").css({marginTop : m, marginBottom: m});
})(jQuery);