var x = 150;
var y = 200;
var dx = 0.5;
var dy = 1;
var width;
var height;
var r=10;
var ctx;
var canvas;
var interval;
var paddlex;
var paddleh;
var paddlew;
var rightDown = false;
var leftDown = false;
var canvasMinX;
var canvasMaxX;
var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;
var row;
var col;
var rowheight;
var colwidth;
var collision;


function draw() {
  ctx.clearRect(0, 0, height, width);
  drawbricks();
  ctx.beginPath();
  ctx.rect(paddlex, height - paddleh, paddlew, paddleh);
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();

  //premik ploscice levo in desno
if (paddlex < width && paddlex > 0) {
    if (rightDown && paddlex + paddlew < width)
        paddlex += 5;
    else if (leftDown && paddlex > 0)
         paddlex -= 5;
}   else {
        if (rightDown && paddlex + paddlew < width)
            paddlex += 5;
        else if (leftDown && paddlex > 0)
            paddlex -= 5;
    }

  x += dx;
  y += dy;
  if(x + dx > width -r || x + dx < r )
    dx =-dx

  if (y + dy > height -r|| y + dy < r)
    dy = -dy;


  x += dx;
  y += dy;

    if (y + dy < r)
        dy = -dy;
    if (y + dy > height-r*2) {
        if (x > paddlex - r && x < paddlex + paddlew + r){
          dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
          dy = -dy;
        }
        else if (y + dy > height-r){
            clearInterval(interval);
            clearInterval(collision);
        }
    }
    
}
init();

function brickCollision(){
  rowheight = BRICKHEIGHT + PADDING;
  colwidth = BRICKWIDTH + PADDING;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  //ce smo zadeli opeko, vrni povratno kroglo in oznaci v tabeli, da opeke ni več
if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[col][row] == 1) {
  dy = -dy; bricks[col][row] = 0;
  }
}


function init(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    width = 500;
    height = 500;
    paddlex = width / 3;
    paddleh = 10;
    paddlew = 100;
    canvasMinX = $("canvas").offset().left + paddlew / 2;
    canvasMaxX = canvasMinX + width - paddlew;
    collision=setInterval(brickCollision, 10);
    return interval = setInterval(draw, 10);
}

function drawbricks(){
    for (i=0; i < NROWS; i++) {
        for (j=0; j < NCOLS; j++) {
            if(bricks[i][j]==1){
                ctx.fillStyle=("blue")
                ctx.fillRect(i*BRICKWIDTH + i*PADDING + 4, j*BRICKHEIGHT + j*PADDING, BRICKWIDTH, BRICKHEIGHT);
            }
            ctx.fillStyle=("black")
        }
              
  }

}


//inicializacija opek - polnjenje v tabelo
function initbricks() { 
  NROWS = 5;
  NCOLS = 5;
  BRICKWIDTH = (width/NCOLS) - 4;
  BRICKHEIGHT = 15;
  PADDING = 3;
  bricks = new Array(NROWS);
  for (i=0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    for (j=0; j < NCOLS; j++) {
      bricks[i][j] = 1;
    }
  }
}

//nastavljanje leve in desne tipke
function onKeyDown(evt) {
    if (evt.keyCode == 39)
        rightDown = true;
    else if (evt.keyCode == 37) 
        leftDown = true;
}
  
function onKeyUp(evt) {
    if (evt.keyCode == 39)
        rightDown = false;
    else if (evt.keyCode == 37)
        leftDown = false;
  }

function onMouseMove(evt) {
    if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
      paddlex = evt.pageX - canvasMinX;
    }
}
  $(document).mousemove(onMouseMove);
  $(document).keydown(onKeyDown);
  $(document).keyup(onKeyUp); 
  initbricks();