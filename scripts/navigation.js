//var LMW = LMW || {};
if (typeof(LMW) == 'undefined') LMW = {};

LMW.navigation = (function(window, document, $, undefined) {

  function resetNavigation(){

    var child_list = document.getElementById('navigation').children;
       
    for (var index = 0; index < child_list.length; index++)
      {
        var child = child_list[index];

        if (child.classList.contains('on')) { child.classList.remove('on'); }
      }

      var child_list_content = document.getElementById('content').children;

      for (var index = 0; index < child_list_content.length; index++)
      {
        var child = child_list_content[index];
        if (child.classList.contains('hidden') !== true) { child.classList.add('hidden'); }
      }
  }

  function addCarousel() {
    $('#thumbnails').addClass('on');
    $(".jMyCarousel").jMyCarousel({  
        visible: '10',
        eltByElt: true,
        start: 1,
        evtStart: 'mousedown',
        evtStop: 'mouseup'
    }); 
  }

  //Updating content for selected section
  //element_id must be 'about me', 'resume', 'portfolio', or 'contact' (desktop only)
  function navigateTo(element_id,resize) {

    document.getElementById('content').setAttribute('data-active-section',element_id);
    resetNavigation();


    document.getElementById(element_id).classList.add('on');

    var content_id = element_id + '_content';
    document.getElementById(content_id).classList.remove('hidden');

    if (resize == false && element_id == "portfolio")
    {
      $("#portfolio-section").empty();
      LMW.portfolio.clearCategoryLinks();
    }

    if (!is_mobile) {
      if (element_id == "portfolio")
      {
        $("#content").css({"margin-top":"5em"});
      }

      else { $("#content").css({"margin-top":"7em"}); }
      
      dealWithThumbnails(element_id);
    }
  }

  function dealWithThumbnails(element_id) {
    if (element_id == "portfolio")
    {
      if ($("#thumbnails").hasClass("hidden")) { $("#thumbnails").removeClass("hidden"); }
      if ( !( $("#thumbnails").hasClass("on") ) && $(window).width() > 961) { addCarousel(); }    
    }
   
    else
    {
      if (!($("#thumbnails").hasClass("hidden"))) { $("#thumbnails").addClass("hidden"); } 
    }
  }

  function mobileCheck() {
    var w = $(window).width();
    if (w < 961) { is_mobile = true;}
    else {is_mobile = false;}
  }


  $(window).resize(function() {
    var active_section = document.getElementById('content').getAttribute('data-active-section');
    var prev_status = is_mobile;
    mobileCheck();

    //if there was a switch from mobile <--> desktop
    if (prev_status != is_mobile) { 

      //maintain the active section no matter the size, but only show first piece for desktop
      if (active_section === "portfolio")
      {
        $("#portfolio-section").empty();
        var act_sect = document.getElementById("portfolio_content").getAttribute("data-current_section");

        if (act_sect != "none")
        {
          navigateTo('portfolio',true); 
          LMW.portfolio.changeSelectedSection(act_sect);
        }
        LMW.portfolio.addArrowHandler();
      }
      if (active_section != "none") {navigateTo(active_section);}
    }
  });


  return {
    mobile: window.is_mobile,
    setupClickHandlers: function() {
      $("#navigation").on('click','.nav-tab', function() { navigateTo(this.id,false); })    
      $(".needs_kerning").lettering();
      var contact = $("#mobile_heading").children().clone();
      contact[2].classList.remove('mobile-only');
      $("#contact_content").append(contact);
      mobileCheck();
    }
  };

})(window, document ,jQuery); 
