//Some global variables
var board = [];
var row = [];
var results = [];
var resultsrow = [];
var code = [];
var currentRow = 11;
var currentSpot = 1; 


var play = function()
{
    if (currentRow == 11 && currentSpot == 1)
    {
        createBoard();
    }

    else { drawBoard(); }
}
//When a key is pressed
var createBoard = function()
{
    for (var i = 0; i < 12; i++)
    {
        var r = ['nothing','blankspace','blankspace','blankspace','blankspace','nothing'];
        var rr = ['rblankspace','rblankspace','rblankspace','rblankspace'];
        board[i] = r;
        results[i] = rr;
    }

    b = getElementById("b");
    b.innerhtml = "";

   /*         <div class="row">
            </div>
            <div class="row0">
                <div class = "space"><img id="00" /></div>
                <div class = "space"><img id="01" /></div>
                <div class = "space"><img id="02" /></div>
                <div class = "space"><img id="03" /></div>
                <div class = "space"><img id="04" /></div>
                <div class = "space"><img id="05" onclick="Ok('nothing')"/></div>               
            </div>
            <div class="row1">
                <div class = "space"><img id="10" /></div>
                <div class = "space"><img id="11" /></div>
                <div class = "space"><img id="12" /></div>
                <div class = "space"><img id="13" /></div>
                <div class = "space"><img id="14" /></div>
                <div class = "space"><img id="15" onclick="Ok('nothing')"/></div>  
            </div>
            <div class="row2">
                <div class = "space"><img id="20" /></div>
                <div class = "space"><img id="21" /></div>
                <div class = "space"><img id="22" /></div>
                <div class = "space"><img id="23" /></div>
                <div class = "space"><img id="24" src=""/></div>    
                <div class = "space"><img id="25" onclick="Ok('nothing')"/></div>           
            </div>
            <div class="row3">
                <div class = "space"><img id="30" /></div>
                <div class = "space"><img id="31" /></div>
                <div class = "space"><img id="32" /></div>
                <div class = "space"><img id="33" /></div>
                <div class = "space"><img id="34" /></div>
                <div class = "space"><img id="35" onclick="Ok('nothing')"/></div>  
            </div>
            <div class="row4">
                <div class = "space"><img id="40" /></div>
                <div class = "space"><img id="41" /></div>
                <div class = "space"><img id="42" /></div>
                <div class = "space"><img id="43" /></div>
                <div class = "space"><img id="44" /></div>
                <div class = "space"><img id="45" onclick="Ok('nothing')"/></div>   
            </div>
            <div class="row5">
                <div class = "space"><img id="50" /></div>
                <div class = "space"><img id="51" /></div>
                <div class = "space"><img id="52" /></div>
                <div class = "space"><img id="53" /></div>
                <div class = "space"><img id="54" /></div>
                <div class = "space"><img id="55" onclick="Ok('nothing')"/></div>  
            </div>
            <div class="row6">
                <div class = "space"><img id="60" /></div>
                <div class = "space"><img id="61" /></div>
                <div class = "space"><img id="62" /></div>
                <div class = "space"><img id="63" /></div>
                <div class = "space"><img id="64" /></div>
                <div class = "space"><img id="65" onclick="Ok('nothing')"/></div>  
            </div>          
            <div class="row7">
                <div class = "space"><img id="70" /></div>
                <div class = "space"><img id="71" /></div>
                <div class = "space"><img id="72" /></div>
                <div class = "space"><img id="73" /></div>
                <div class = "space"><img id="74" /></div>
                <div class = "space"><img id="75" onclick="Ok('nothing')"/></div>  
            </div>
            <div class="row8">
                <div class = "space"><img id="80" src=""/></div>
                <div class = "space"><img id="81" src=""/></div>
                <div class = "space"><img id="82" src=""/></div>
                <div class = "space"><img id="83" src=""/></div>
                <div class = "space"><img id="84" src=""/></div>
                <div class = "space"><img id="85" onclick="Ok('nothing')"/></div>  
            </div>
            <div class="row9">
                <div class = "space"><img id="90" src=""/></div>
                <div class = "space"><img id="91" src=""/></div>
                <div class = "space"><img id="92" src=""/></div>
                <div class = "space"><img id="93" src=""/></div>
                <div class = "space"><img id="94" src=""/></div>
                <div class = "space"><img id="95" onclick="Ok('nothing')"/></div>  
            </div>
            <div class="row10">
                <div class = "space"><img id="100" src=""/></div>
                <div class = "space"><img id="101" src=""/></div>
                <div class = "space"><img id="102" src=""/></div>
                <div class = "space"><img id="103" src=""/></div>
                <div class = "space"><img id="104" src=""/></div>
                <div class = "space"><img id="105" onclick="Ok('nothing')"/></div>  
            </div>          
            <div class="row11">
                <div class = "space"><img id="110" /></div>
                <div class = "space"><img id="111" /></div> 
                <div class = "space"><img id="112" /></div>
                <div class = "space"><img id="113" /></div>
                <div class = "space"><img id="114" /></div>
                <div class = "space"><img id="115" onclick="Ok('nothing')"/></div>  
            </div>*/

    drawBoard();
    setCode();
}

var drawBoard = function()
{
    var r = "row"
    var s = "space";
    //alert(name);
    for (var row = 0; row < 12; row++)
    {
        for (var spot = 0; spot < 6; spot++)
        {
            var peg = "assets/" + board[row][spot] + ".png";
            document.getElementById(""+ row+spot).src= peg;
            if (spot < 4)
            {
                var rpeg = "assets/" + results[row][spot] + ".png";
                document.getElementById("r" + row + spot).src = rpeg;
            }
        }
    }
}

var setCode = function()
{
    code= ['blue','blue','blue','purple'];
}

var move = function(color)
{
    board[currentRow][currentSpot] = color;
    var peg = "assets/" + board[currentRow][currentSpot] + ".png";
    //document.getElementById(""+ row+spot).src= peg;


    drawBoard();

    if (currentSpot == 4)
    {
        currentSpot++;
        Ok('ok');
    }

    else {currentSpot++}
}

var Ok = function (ok)
{
    board[currentRow][currentSpot] = ok;
    var peg = "assets/" + board[currentRow][currentSpot] + ".png";   
    if (ok == "nothing")
    {
        checkCode();
        currentSpot = 1;
        board[currentRow][0] = 'nothing';
        currentRow--;
        board[currentRow][0] = 'Arrow';
    } 

    if (ok == "ok")
    {
    }
    drawBoard();
}

var checkCode = function ()
{
    var blackcount = 0;
    for (var x = 0; x < 4; x++)
    {
        if (code[x] == board[currentRow][x+1])
        {
        blackcount++;
        }
    }

    for (var b = 0; b < blackcount; b++)
    {   
        results[currentRow][b] = 'blackpeg';
    }

    if (blackcount == 4)
    { alert("you win!"); }
}
var newGame = function ()
{
    currentSpot = 1;
    currentRow = 11;
    createBoard();
    //resetCode
}

window.onload()
{
    play();
}
