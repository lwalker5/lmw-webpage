if (typeof(LMW) == 'undefined') LMW = {};

$(document).ready(function() {

  //LMW.navigation.mobileCheck();
  Handlebars.registerHelper('h', function(object) {
	  var height = 0;
	  if (object.classType == 'common') { height = "75"; }
	  else {height = "100"; }

	  return new Handlebars.SafeString(
	    height
	  );
	});

  Handlebars.registerHelper('icon', function(object) {
  	var str = object.title;
  	var s = str.replace(' ','_');

  	return new Handlebars.SafeString(
  		s + "_icon"
  	);
  });

  LMW.navigation.setupClickHandlers();
  LMW.portfolio.setup();
  
  //$("#navigation").on('click','.tabtext', function() { navigateTo(this.id); })
});
