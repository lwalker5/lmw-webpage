
if (typeof(LMW) == 'undefined') LMW = {};

LMW.portfolio = (function(window, document, $, undefined) {

  var portfolioData = {
      '3D': ['spacecruiser','drink','lego'],
      'web': ['mysite','ifeis','mastermind','picksix'],
      'print': ['bandlink','sixword','futura'],
      'drawing': ['figure','dress','technical','character']
  }  

  function loadPortfolioData(){
      if (!LMW.choices){
          $.ajax({
          url: 'scripts/portfolio_choices.json',
          dataType: 'json',
          success: function(data) {
            LMW.choices = data;
            var template = Handlebars.compile($('#thumbnail_template').html());
            for (var category in portfolioData) {
              var categoryList = portfolioData[category];
              var templateData = {};
              for (var j = 0; j < categoryList.length; j++) {
                var pieceName = categoryList[j];
                templateData[pieceName] = data[pieceName];
              }
              var iconHTML = template(templateData);
              $('.swiper-wrapper').append(iconHTML);
            }
          },
          error: function(err,status,errorText) {
            //console.log(status,errorText);
          }
          })
      }
  }

  function changeHTML(selectedIcon) {
    var img_id = selectedIcon + "_icon";
    if (!is_mobile)
    {
      var category = document.getElementById(img_id).getAttribute("data-category");
      document.getElementById('portfolio_content').setAttribute('data-current_section',category);
    }

    var info = LMW.choices[selectedIcon];
    info['selectedIcon'] = selectedIcon;

    Handlebars.registerHelper('canvas_width', function() {
      var canvas_width = this.more_imgs.length*20 + 50;
      return canvas_width;
    });

    var source = $('#portfolio_piece_template').html();
    var template = Handlebars.compile(source);

    $('#portfolio-section').append(template(info));
    window.mySwipe = [];

    $('#'+selectedIcon+' img').load(function() {
      h = $('#'+selectedIcon+' img').height();
      $('#'+selectedIcon).css('height',h+37);
      $('#'+selectedIcon+'-pagination').css('width',(info.more_imgs.length+1)*20);
    });
    if (info.more_imgs.length >= 1) { addSwiper(selectedIcon); }

    if (selectedIcon == 'ifeis' && is_mobile) {
      $('#ifeislink a').attr('href','assets/ifeis/ifeisapp/');
    }
  }

  function findCurrIndex(list_of_imgs) {
    var index = null;
    for (var i = 0; i < list_of_imgs.length; i++)
    {
      if (list_of_imgs[i].classList.contains('desktop-shown')) {
        index = i;
      }
    }
    return index;
  }

  function addSwiper(id) {
    window.mySwipe[id] = $("#"+id).swiper({
      mode:'horizontal',
      slidesPerView: 1,
      initialSlide: 0,
      centeredSlides: false,
      loop: false,
      pagination: '#'+id+'-pagination',
      paginationClickable: true,
      keyboardControl: true
    });
  }

  return {
    clearCategoryLinks: function() {
      var child_list = document.getElementById('portfolio-categories').children;
      for (var index = 0; index < child_list.length; index++)
      {
        if (child_list[index].classList.contains('selected'))
        {
          child_list[index].classList.remove('selected');
        }
      }
      document.getElementById('portfolio_content').setAttribute('data-current_section','none');
    },

    changeSelectedSection: function(chosen) {
      LMW.portfolio.clearCategoryLinks();

      document.getElementById('portfolio-section').innerHTML = '';
      document.getElementById('portfolio_content').setAttribute('data-current_section',chosen);

      var data = {
          'web': ['mysite','ifeis','mastermind','picksix'],
          'print': ['bandlink','sixword','futura'],
          '3D': ['spacecruiser','drink','lego'],
          'drawing': ['figure','dress','technical','character']
      }       

      document.getElementById(chosen).classList.add("selected");
      var num = (is_mobile) ? data[chosen].length : 1;

      for (var x = 0; x < num; x++) {
          changeHTML(data[chosen][x]);
      }
    },

    setup: function() {

          //loadThumbnails();
          loadPortfolioData();
          var portfolio_contents = new Array({name:"web",amt:"4",on:"true"}, 
                                             {name:"print",amt:"3",on:"false"}, 
                                             {name:"3D",amt:"3",on:"false"},
                                             {name:"drawing",amt:"4",on:"false"});

          var startpos = 6.5;
          var numgrps = 4;

          for (var a = 0; a < portfolio_contents.length; a++)
          {
              var new_link = document.createElement("a");
              new_link.classList.add("portfolio-header-text");
              new_link.classList.add("inline-block");
              new_link.id = portfolio_contents[a].name;

              text_label = document.createTextNode(portfolio_contents[a].name);

              new_link.appendChild(text_label);
              var spot = document.getElementById("portfolio-categories");
              spot.appendChild(new_link);
          }

          //add click handlers for the portfolio categories
          $("div#portfolio-categories").on('click','a',function() {LMW.portfolio.changeSelectedSection(this.id); this.classList.add("selected"); });

          //add click handlers for the portfolio thumbnails - desktop only
          $("#thumbnail_wrapper").on('click','.swiper-slide',function() { 
            $("div#portfolio-section").empty();
            console.log('clicked');
            console.log(this);
            var name = $(this).children()[0].id.replace('_icon','');

            changeHTML(name); 
            //LMW.portfolio.addArrowHandler(name);

      });
    }
  }

})(window, document ,jQuery); 
