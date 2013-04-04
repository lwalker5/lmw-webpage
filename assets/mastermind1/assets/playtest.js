function game(board,results,level,currentRow,currentSpot,codeLength)
{
this.board = board;
this.results = results;
this.level = level;
this.currentRow = currentRow;
this.currentSpot = currentSpot;
this.codeLength = codeLength;

    this.createBoard = function()
    {
        var boardHTML = "";
        var resultHTML = "";
        boardHTML += '<div class="row"></div>';
        resultHTML += '<div class = "rowresult"></div>';
        for (var r = 0; r < 12; r++)
        {
            var row = []; //create a row 
            var resultsRow = ['rblankspace','rblankspace','rblankspace','rblankspace']; //create the results for the row
            alert(this.level);
            this.results[r] = resultsRow; //fill the results part of the row with blanks
            alert("doing ok");
            boardHTML += '<div class="row' + r + '">';
            resultHTML += '<div class="rowresult">';

            alert("doing ok");
            for (var spot = 0; spot < (this.codeLength +1); spot++)
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
                    row[spot] = 'blankspace' + this.level;
                }

                boardHTML += '<div class = "space"><img id="' + r + spot +  '"/></div>';
                resultHTML += '<div class = "resultpeg"><img id = "r' + r + spot + '"/></div>';
            }
            row[(this.codeLength+1)] = 'nothing';
            this.board[r] = row;

            resultHTML += '</div>';
            boardHTML += '<div class = "space"><img id="' + r + (this.codeLength + 1) + '" onclick="Ok(\'nothing\')"/></div></div>';
        }
        document.getElementById('boardId').innerHTML = boardHTML;
        document.getElementById('resultId').innerHTML = resultHTML;

        this.drawBoard();
        setCode();
    }

    this.drawBoard = function(this)
    {
        var r = "row"
        var s = "space";

        for (var row = 0; row < 12; row++)
        {
            for (var spot = 0; spot < (this.codeLength + 2); spot++)
            {
                var peg = "assets/" + this.board[row][spot] + ".png";
                document.getElementById(""+ row+spot).src= peg;
                if (spot < 4)
                {
                    var rpeg = "assets/" + this.results[row][spot] + ".png";
                    document.getElementById("r" + row + spot).src = rpeg;
                }
            }
        }
    }
}

var play = function(difficulty,codeLength)
{
    var board = [];
    var results = [];
    var code = [];

    var theGame = new game(board,results,difficulty,11,1,codeLength);
    alert(theGame.level);
    if (theGame.currentRow == 11 && theGame.currentSpot == 1)
    {
        theGame.createBoard();
    }

    else { drawBoard(); }
}
//When a key is pressed

var setCode = function()
{
    code= ['blue','blue','blue','purple'];
}

var move = function(color)
{
    if (this.currentSpot <= this.codeLength)
    {
        fillSpace(color); //update board with color choice

        if (rowFilled()) //if the code is full
        {
            showOK();
        }

        drawBoard();
        this.currentSpot++;
    }
}

var Ok = function (okstatus) //Ok has been clicked on
{
    if (rowFilled()) //make sure all spots are filled
    {
        hideOK();
        checkCode(); //see if the code submitted is correct
        moveToNextRow();
    }

    drawBoard();
}

var showOK = function(status)
{
    this.board[this.currentRow][this.currentSpot+1] = 'ok';
}

var hideOK = function()
{
    this.board[this.currentRow][this.currentSpot] = 'nothing';    
}

var fillSpace = function(color)
{
    this.board[this.currentRow][this.currentSpot] = color + level;  
}

var rowFilled = function()
{
    if (this.board[this.currentRow][this.codeLength] != 'blankspace' + level)
    {
        return true;
    }
    return false;
}

var moveToNextRow = function ()
{
    this.currentSpot = 1; //if not move to the next row
    this.board[this.currentRow][0] = 'nothing'; // remove the arrow from current row
    this.currentRow--; //bottom row is 12 so move up one
    this.board[this.currentRow][0] = 'Arrow'; //add the arrow to the next row
}

var checkCode = function ()
{
    var blackcount = 0;
    for (var x = 0; x < codeLength; x++)
    {
        if (this.code[x] == this.board[this.currentRow][x+1])
        {
        blackcount++;
        }
    }

    for (var b = 0; b < blackcount; b++)
    {   
        this.results[this.currentRow][b] = 'blackpeg';
    }

    if (blackcount == 4)
    { alert("you win!"); }
}

var changeDifficulty = function (level)
{
    if (level == "easy")
    {
        this.codeLength = 4;
    }

    else if (level == "medium")
    {
        alert("medium");
        this.codeLength = 5;
    }

    newGame(level,codeLength);
}

var newGame = function (difficulty,codeLength)
{
    //currentSpot = 1;
    //currentRow = 11;
    level = difficulty;
    play(difficulty,codeLength);
    //resetCode
}

window.onload()
{
    play();
}
