if (typeof(LMW) == 'undefined') LMW = {};

$(document).ready(function() {

  //LMW.navigation.mobileCheck();
  LMW.navigation.setupClickHandlers();
  LMW.portfolio.setup();
  
  //$("#navigation").on('click','.tabtext', function() { navigateTo(this.id); })
});
