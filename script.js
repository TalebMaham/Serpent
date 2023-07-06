var canvasWidth = 900;
var canvasHeight = 600;
var blockSize = 30;
var ctx;
var delay = 100;
var canvas;
var xCoord = 0;
var yCoord = 0;
var snakee;

window.onload = function() {
  init();

  function init() {
    canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");

    snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
    refreshCanvas();
  }

  function refreshCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snakee.advance();
    snakee.draw();
    setTimeout(refreshCanvas, delay);
  }

  function drawBlock(ctx, position) {
    var x = position[0] * blockSize;
    var y = position[1] * blockSize;
    ctx.fillRect(x, y, blockSize, blockSize);
  }

  function Snake(body, direction) {
    this.body = body;
    this.currentDirection = direction;

    this.draw = function() {
      ctx.save();
      ctx.fillStyle = "#ff0000";
      for (var i = 0; i < this.body.length; i++) {
        drawBlock(ctx, this.body[i]);
      }
      ctx.restore();
    };

    this.advance = function() {
      var nextPosition = this.body[0].slice();

      switch (this.currentDirection) {
        case "left":
          nextPosition[0]--;
          break;
        case "right":
          nextPosition[0]++;
          break;
        case "up":
          nextPosition[1]--;
          break;
        case "down":
          nextPosition[1]++;
          break;
        default:
          // Cas par défaut si la direction n'est pas reconnue
          break;
      }

      this.body.unshift(nextPosition);
      this.body.pop();
    };

    this.setDirection = function(newDirection) {
      var oppositeDirections = {
        left: "right",
        right: "left",
        up: "down",
        down: "up"
      };

      if (newDirection !== oppositeDirections[this.currentDirection]) {
        this.currentDirection = newDirection;
      }
    };
  }

  document.onkeydown = function handleKeyDown(e) {
    var key = e.keyCode;
    var newDirection;

    switch (key) {
      case 37: // Flèche gauche
        newDirection = "left";
        break;
      case 38: // Flèche haut
        newDirection = "up";
        break;
      case 39: // Flèche droite
        newDirection = "right";
        break;
      case 40: // Flèche bas
        newDirection = "down";
        break;
      default:
        // Autre touche enfoncée, aucune nouvelle direction définie
        break;
    }
    snakee.setDirection(newDirection);
  };
};
