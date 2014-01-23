
if (typeof(LMW) == 'undefined') LMW = {};

LMW.portfolio = (function(window, document, $, undefined) {


    function loadPortfolioData(){
        if (!LMW.choices){
            $.ajax({
            url: 'assets/scripts/portfolio_choices.json',
            dataType: 'json',
            success: function(data) {
            LMW.choices = data;
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

    var link = document.createElement("a");
    if (info.mainimg) {
        var img = document.createElement("img");

        var path = "assets/" + selectedIcon + "/" + info.mainimg;

        img.src = path + ".png";
    } 

    var piecewrapper = makeElement('div',['pieceshell']);
    var shell = makeElement('div', ['imgshell','inline-block',selectedIcon]);

    //The header for each piece including title and medium
    var text = makeElement('div',['textshell','inline-block']);
    var header = makeElement('div',['headershell','inline-block']);

    //The title of a piece - larger and teal
    var name = makeElement('span',['name']);
    name.id = "pname";
    name.innerHTML = info.name;

    //The medium - in italic
    var medium = makeElement('span',['pmedium'])
    medium.innerHTML = info.medium;

    //Attach the text to the header section
    header.appendChild(name);
    header.appendChild(medium);
    var header_alt = $(header).clone();

    //Create the wrapper divs for the swiper
    var outerswiper = makeElement('div',['swipe']);
    outerswiper.id = selectedIcon;
    var innerswiper = makeElement('div',['swipe-wrap']);

    //Wrapper for the content to be swiped
    var swiperwrapper = makeElement('div',['img_and_cap','desktop-shown']);

    //Create the div for the actual img of the piece
    var piece = makeElement('div',['piece']);
    if (info.mainimg) { piece.appendChild(img);}


    //A short description below the image
    var caption = makeElement('span',['ritalic','caption']);
    var captxt = document.createTextNode(info.maintitle);
    if (info.maintitle != undefined) { caption.appendChild(captxt);} 

    swiperwrapper.appendChild(piece);
    swiperwrapper.appendChild(caption);

    innerswiper.appendChild(swiperwrapper);

    for (var i = 0; i < info.more_imgs.length; i++)
    {
        var new_swiperwrapper = makeElement('div',['img_and_cap','desktop_hidden']);
        var new_img = document.createElement("img");
        new_img.src = "assets/" + selectedIcon + "/" + info.more_imgs[i].name;
        new_img.title = info.more_imgs[i].caption;
        new_swiperwrapper.appendChild(new_img);
        var new_caption  = makeElement('span',['ritalic','caption']);
        var new_captxt = document.createTextNode(info.more_imgs[i].caption);
        if (info.more_imgs[i].caption != undefined) { new_caption.appendChild(new_captxt);} 
        new_swiperwrapper.appendChild(new_caption);
        innerswiper.appendChild(new_swiperwrapper);
    }

    outerswiper.appendChild(innerswiper);

    //A longer description of the set of images
    var newInfo = info.text;
    var ext_text = makeElement('div',['pieceinfo','resume']);
    ext_text.innerHTML = newInfo;

    header_alt[0].classList.add("one-column-only");
    shell.appendChild(header_alt[0]);
    shell.appendChild(outerswiper);

    var left_arrow = makeElement("img",['arrow']);
    left_arrow.id = "l";
    left_arrow.src = "assets/left_arrow.png";

    left_arrow.style.top = "-10em";

    var right_arrow = makeElement("img",['arrow']);
    right_arrow.id = "r";
    right_arrow.src = "assets/right_arrow.png";

    var canvas_shell = makeElement("div",['canvas_shell']);

    var more_imgs = info.more_imgs;
    if (more_imgs.length > 0) {
        var canvas = document.createElement("canvas");
        canvas.id = selectedIcon + "canvas";

        if (more_imgs.length % 2 == 0)
        { 
          var w = (more_imgs.length +1)*18;
          canvas.width = w;
        }

        else { 
          var w = (more_imgs.length +1)*19;
          canvas.width = w;
        }          

        canvas.height = 20;
        canvas.setAttribute('data-num_imgs',more_imgs.length);
        canvas.setAttribute('data-num_curr_img',0);

        var c_width = more_imgs.length*20 + 50;

        shell.appendChild(canvas);

        outerswiper.appendChild(left_arrow);
        outerswiper.appendChild(right_arrow);
    }

    piecewrapper.appendChild(shell);
    header.classList.add('two-column-only');
    text.appendChild(header);
    text.appendChild(ext_text);
    piecewrapper.appendChild(text);

    document.getElementById('portfolio_section').appendChild(piecewrapper);
    window.mySwipe = [];
    addSwiper(selectedIcon);
    if (more_imgs.length > 0 ) {
      drawCircles(selectedIcon); 
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

  function switchSelectedImage(arrow_dir,img_id) {
    var piece_selector = "#" + img_id;
    var canvas = img_id + "canvas";
    var c = document.getElementById(canvas);
    var arg = $(".img_and_cap");
    var list_of_imgs = $(piece_selector).find(arg); 
    var curr_img_index = findCurrIndex(list_of_imgs);

    var new_spot = (arrow_dir == 'l') ? curr_img_index - 1 : curr_img_index + 1; 

    //alert(new_spot);
    if (new_spot >= 0 && new_spot < list_of_imgs.length) {    
      list_of_imgs[curr_img_index].classList.remove('desktop-shown');
      list_of_imgs[curr_img_index].classList.add('desktop_hidden');
      list_of_imgs[new_spot].classList.remove('desktop_hidden');
      list_of_imgs[new_spot].classList.add('desktop-shown');

    //checking if the swipe was forward or backward to determine circle movement
      c.setAttribute('data-num_curr_img',new_spot);
      drawCircles(img_id);
    }   
  }

  function makeElement(elementType, classesToAdd) {
    var div = document.createElement(elementType);
    if (typeof classesToAdd === 'undefined') { classesToAdd = []; }

    for (i = 0; i < classesToAdd.length; i++) {
        div.classList.add(classesToAdd[i]);
    }

    return div;
  }

  function drawCircles(name) {
    var id = name + "canvas";
    var c = document.getElementById(id);
    clearCanvas(c);
    var context = c.getContext("2d");
    //context.scale(2,2);

    x = 6.5;
    var b = 0;
    context.strokeStyle = "#1FAAA6";
    context.fillStyle = "#1FAAA6";
    while (b <= c.getAttribute('data-num_imgs'))
    {
        context.beginPath();
        //context.arc(x,6.5,5,0,Math.PI*2,false);
        context.arc(x,6.5,5,0,Math.PI*2,false);
        context.closePath();
        context.stroke();
        if (b == c.getAttribute('data-num_curr_img')) {context.fill();}
        x+=18;
        b++;
    }
    context.stroke();
  }

  function clearCanvas(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.save();

  // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

  }

  function updateCircles(id) {
    var canvas_id = id + 'canvas';
    var c = document.getElementById(canvas_id);
    //clearCanvas(c);


    var img_string = '#' + id + ' .img_and_cap';
    var swipe_grp = document.getElementById(id);

    var grp = document.querySelectorAll(img_string);
    var curr_index = null;
    var a = 0;
    while (a < grp.length)
    {
      var webkit_val = (grp[a].style.webkitTransform.slice(0,13));
      if(webkit_val == 'translate(0px') { var curr_index = a;}
      a++;
    }

    var index = Number(c.getAttribute('data-num_curr_img'));

    //checking if the swipe was forward or backward to determine circle movement
    var next = (curr_index > index) ? index += 1 : index -= 1; 

    c.setAttribute('data-num_curr_img',next);
    drawCircles(id) ;
  }

  function addSwiper(id) {
    window.mySwipe[id] = new Swipe(document.getElementById(id), {
      startSlide: 0,      speed: 400,
      auto: 0,
      continuous: false,
      callback: function(index, slides) {
        updateCircles(id);
      }
    });
  }

  return {
    clearCategoryLinks: function() {
      var child_list = document.getElementById('categories').children;
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

      document.getElementById('portfolio_section').innerHTML = '';
      document.getElementById('portfolio_content').setAttribute('data-current_section',chosen);

      var data = {
          'web': ['mysite','mastermind','picksix','paramount'],
          'print': ['bandlink','sixword','futura'],
          '3D': ['spacecruiser','drink','lego'],
          'drawing': ['figure','technical','character']
      }       

      document.getElementById(chosen).classList.add("selected");
      var num = (is_mobile) ? data[chosen].length : 1;

      for (var x = 0; x < num; x++) {
          changeHTML(data[chosen][x]);
      }

      for (var y = 0; y < num; y++) {
          LMW.portfolio.addArrowHandler(data[chosen][y]);
      }

    },

    addArrowHandler: function(name) {

        var img_path = "#" + name;
        var left_path = img_path + " #l";
        var right_path = img_path + " #r";

        $(img_path).hover(function() {

          var h = $(img_path).height();
          var shift_amt = 51 + (h/2);
          var shift_string = "-" + shift_amt + "px";

          $(left_path).css('top',shift_string);
          $(right_path).css('top',shift_string);

          $(left_path).filter(':not(:animated)').animate({
            left: 0
          });
          $(right_path).filter(':not(:animated)').animate({
            right: 0
          });
        }, 
        function() {
          $(left_path).animate({
            left: '-25'
          });
          $(right_path).animate({
            right: '-25'
          }); 
        });
    },

    setup: function() {

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
              new_link.classList.add("pheader");
              new_link.classList.add("inline-block");
              new_link.id = portfolio_contents[a].name;

              text_label = document.createTextNode(portfolio_contents[a].name);

              new_link.appendChild(text_label);
              var spot = document.getElementById("categories");
              spot.appendChild(new_link);
          }

          //add click handlers for the portfolio categories
          $("div#categories").on('click','.pheader',function() {LMW.portfolio.changeSelectedSection(this.id); this.classList.add("selected"); });

          //add click handlers for the portfolio thumbnails - desktop only
          $("div#thumbnails").on('click','img',function() { 
            $("div#portfolio_section").empty();

            var name = this.id.replace('_icon','');

            changeHTML(name); 
            LMW.portfolio.addArrowHandler(name);

      });
    }
  }

})(window, document ,jQuery); 
