var canvasWidth = 900;
var canvasHeight = 600; 
var blockSize = 30 ;
var ctx; 
var delay = 1000; 
var canvas;
var xCoord = 0; 
var yCoord = 0; 
var snakee;  

window.onload = function()
{
var ctx; 
var delay = 1000; 
var canvas;
var xCoord = 0; 
var yCoord = 0;
init(); 

function init()
{
    canvas = document.createElement('canvas'); 
    canvas.width = canvasWidth; 
    canvas.height = canvasHeight; 
    canvas.style.border = "1px solid"; 
    document.body.appendChild(canvas); 
    ctx = canvas.getContext("2d"); 

    snakee = new Snake([[6,4], [5, 4], [4, 4]]);
    resfreshCanvas(); 
}


function resfreshCanvas() 
{ 
    ctx.clearRect(0,0, canvas.width, canvas.height);
    snakee.advance(); 
    snakee.draw();     
    setTimeout(resfreshCanvas, delay); 
}

function drawBlock(ctx, position)
{
    var x = position[0] * blockSize;
    var y = position[1] * blockSize; 
    ctx.fillRect(x, y, blockSize, blockSize); 

}


function Snake(body)
{
    this.body = body; 
    this.draw = function()
    {
        ctx.save(); 
        ctx.fillStyle = "#ff0000"; 
        for(var i = 0; i< this.body.length; i++)
        {
            drawBlock(ctx, this.body[i]); 
        } 
        ctx.restore(); 
        
    }

    this.advance = function()
    {
        var nextPosition = this.body[0].slice(); 
        nextPosition[0]++; 
        this.body.unshift(nextPosition); 
        this.body.pop(); 

    }
}

}