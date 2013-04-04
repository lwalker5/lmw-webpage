//Some global variables
var board = [];
var results = [];
var code = [];
var level = 'easy';
var currentRow = 11;
var currentSpot = 1; 
var codeLength = 4;


var play = function(difficulty)
{
    if (currentRow == 11 && currentSpot == 1)
    {
        createBoard(difficulty);
    }

    else { drawBoard(); }
}
//When a key is pressed
var createBoard = function(difficulty)
{
    var boardHTML = "";
    var resultHTML = "";
    var codeHTML = "";

    for (var r = 0; r < 12; r++)
    {
        var row = []; //create a row 
        var resultsRow = []; //create the results for the row
        //results[r] = resultsRow; //fill the results part of the row with blanks

        boardHTML += '<div class="row' + r + '">';
        resultHTML += '<div class="rowresult">';

        for (var spot = 0; spot < (codeLength +1); spot++)
        {
            if (spot == 0)
            {
                if (r == 11)
                {
                    row[spot] = 'arrow';
                }
                else
                { row[spot] = 'nothing';}
            }
            else
            {
                row[spot] = 'blankspace' + difficulty;
            }

            resultsRow[spot] = 'rblankspace';
            boardHTML += '<div class = "space"><img id="' + r + spot +  '"/></div>';
            resultHTML += '<div class = "resultpeg"><img id = "r' + r + spot + '"/></div>';
        }
        row[(codeLength+1)] = 'nothing';
        board[r] = row;
        results[r] = resultsRow;

        resultHTML += '</div>';
        boardHTML += '<div class = "space"><img id="' + r + (codeLength + 1) + '" onclick="Ok(\'nothing\')"/></div></div>';
    }
    document.getElementById('boardId').innerHTML = boardHTML;
    document.getElementById('resultId').innerHTML = resultHTML;
    document.getElementById("codeId").innerHTML = codeHTML;

    drawBoard();
    setCode();
}

var drawBoard = function()
{
    var r = "row"
    var s = "space";

    for (var row = 0; row < 12; row++)
    {
        for (var spot = 0; spot < (codeLength + 2); spot++)
        {
            var peg = "assets/" + board[row][spot] + ".png";
            document.getElementById(""+ row+spot).src= peg;
            if (spot < codeLength)
            {
                var rpeg = "assets/" + results[row][spot] + ".png";
                document.getElementById("r" + row + spot).src = rpeg;
            }
        }
    }
}

var setCode = function()
{
    var colorArray = ['pink','orange','yellow','green','blue','indigo','purple','grey'];
    for (var spot = 0; spot < codeLength; spot++)
    {
        var randnum = Math.floor((Math.random()*8)+1);
        code[spot] = colorArray[randnum-1] + level;
    }
}

var move = function(color)
{
    if (color == 'backarrow')
    {
        goBack();
    }

    else if (color == 'giveup')
    {
        endGame(false);
    }

    else if (currentSpot <= codeLength)
    {
        fillSpace(color); //update board with color choice
    }

    if (rowFilled()) //if the code is full
    {
        showOK();
    }

    if (currentSpot <= codeLength)
    {
        currentSpot++;
    }
    drawBoard();
}

var Ok = function (okstatus) //Ok has been clicked on
{
    if (rowFilled()) //make sure all spots are filled
    {
        hideOK();
        var win = checkCode(); //see if the code submitted is correct
        moveToNextRow(win);
    }

    drawBoard();
}

var showOK = function(status)
{
    board[currentRow][currentSpot+1] = 'ok';
}

var hideOK = function()
{
    board[currentRow][currentSpot] = 'nothing';    
}

var goBack = function()
{
    if (currentSpot != 1)
    {
        if (currentSpot == codeLength +1)
        {
            hideOK();
        }
        currentSpot--;
        board[currentRow][currentSpot] = 'blankspace' + level;
    }
    currentSpot--;

}

var fillSpace = function(color)
{
    board[currentRow][currentSpot] = color + level;  
}

var rowFilled = function()
{
    if (board[currentRow][codeLength] != 'blankspace' + level)
    {
        return true;
    }
    return false;
}

var moveToNextRow = function (win)
{
    if (currentRow == 0 || win == true)
    {
        endGame(win);
    }

    else
    {
    currentSpot = 1; //if not move to the next row
    board[currentRow][0] = 'nothing'; // remove the arrow from current row
    currentRow--; //bottom row is 12 so move up one
    board[currentRow][0] = 'arrow'; //add the arrow to the next row
    }
}

var endGame = function (win)
{
    if (win == false)
    {
        board[currentRow][codeLength+1] = 'fail';
    }

    codeHTML = '<div class = "space"><img src = "assets/nothing.png"/></div>';
    for (var i = 0; i < codeLength; i++)
    {
        codeHTML += '<div class = "space"><img src = "assets/' + code[i] + '.png"/></div>';
    }
    document.getElementById("codeId").innerHTML = codeHTML;
    drawBoard();
    currentRow = 50;
}

var checkCode = function ()
{
    var blackcount = 0;
    var whitecount = 0;
    var done = [];
    var tempboard = board[currentRow].slice();

    for (var x = 0; x < codeLength; x++) //for the code spot
    {
        if (code[x] == tempboard[x+1])
        {
            blackcount++;
            tempboard[x+1] = 'blankspace';
            done[x] = true;
        }
    }

    for (var y = 0; y < codeLength; y++)
    {
        for (var z = 0; z < codeLength; z++)
        {
            if (code[y] == tempboard[z+1] && done[y] != true)
            {
                whitecount++;
                tempboard[z+1] = 'blankspace';
                done[y] = true;
            }
        }
    }

    var b = 0;
    for (b = 0; b < blackcount; b++)
    {   
        results[currentRow][b] = 'blackpeg';
    }

    for (var w = 0; w < whitecount; w++)
    {
        results[currentRow][b+w] = 'whitepeg';
    }

    if (blackcount == codeLength)
    { 
        board[currentRow][codeLength+1] = 'win';
        return true;
    }

    else 
    {
        return false;
    }
}

var changeDifficulty = function (d)
{
    if (d == "easy")
    {
        codeLength = 4;
        document.getElementById("easy").className = "difficultyselected";
        document.getElementById("medium").className = "difficultytext";
        document.getElementById("hard").className = "difficultytext";
        document.getElementById("resultId").className = "resultseasy";
    }

    else if (d == "medium")
    {
        codeLength = 5;
        document.getElementById("easy").className = "difficultytext";
        document.getElementById("medium").className = "difficultyselected";
        document.getElementById("hard").className = "difficultytext";
        document.getElementById("resultId").className = "resultsdifficult";
    }

    else if (d == "hard")
    {
        codeLength = 6;
        document.getElementById("easy").className = "difficultytext";
        document.getElementById("medium").className = "difficultytext";
        document.getElementById("hard").className = "difficultyselected";
        document.getElementById("resultId").className = "resultsdifficult";
    }

    level = d;
    newGame();
}

var newGame = function ()
{
    currentSpot = 1;
    currentRow = 11;
    play(level);
    //resetCode
}

function BlockMove(event) {
  // Tell Safari not to move the window.
  event.preventDefault() ;
}

window.onload()
{
    play();
}
