var canvasWidth = 900;
var canvasHeight = 600;
var blockSize = 30;
var ctx;
var delay = 100;
var canvas;
var xCoord = 0;
var yCoord = 0;
var snakee;
var apple;
var score = 0;
var gamePaused = false;

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
    apple = new Apple([10, 10]);
    refreshCanvas();
  }

  function refreshCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gamePaused) {
      snakee.advance();

      if (snakee.checkCollision(apple)) {
        snakee.grow();
        apple.move();
        score++;
      }

      if (snakee.checkCollisionWithWalls() || snakee.checkCollisionWithSelf()) {
        gamePaused = true;
        drawGameOver();
        return;
      }
    }

    drawScore();
    snakee.draw();
    apple.draw();

    if (!gamePaused) {
      setTimeout(refreshCanvas, delay);
    }
  }

  function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: " + score, 10, 30);
  }

  function drawBlock(ctx, position, color) {
    var x = position[0] * blockSize + blockSize / 2;
    var y = position[1] * blockSize + blockSize / 2;
    var radius = blockSize / 2;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }

  function Snake(body, direction) {
    this.body = body;
    this.currentDirection = direction;

    this.draw = function() {
      for (var i = 0; i < this.body.length; i++) {
        var color = (i === 0) ? "#ff0000" : "#000000";
        drawBlock(ctx, this.body[i], color);
      }
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
          break;
      }

      this.checkCollisionWithWalls = function() {
        var head = this.body[0];
        var hitLeftWall = head[0] < 0;
        var hitRightWall = head[0] >= canvasWidth / blockSize;
        var hitTopWall = head[1] < 0;
        var hitBottomWall = head[1] >= canvasHeight / blockSize;

        return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
      };

      this.checkCollisionWithSelf = function() {
        var head = this.body[0];
        for (var i = 1; i < this.body.length; i++) {
          if (head[0] === this.body[i][0] && head[1] === this.body[i][1]) {
            return true;
          }
        }
        return false;
      };

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

    this.grow = function() {
      var tail = this.body[this.body.length - 1];
      this.body.push(tail.slice());
    };

    this.checkCollision = function(element) {
      var snakeHead = this.body[0];
      return snakeHead[0] === element.position[0] && snakeHead[1] === element.position[1];
    };
  }

  function Apple(position) {
    this.position = position;

    this.draw = function() {
      var x = this.position[0] * blockSize + blockSize / 2;
      var y = this.position[1] * blockSize + blockSize / 2;
      var radius = blockSize / 2;

      ctx.fillStyle = "#00ff00";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    };

    this.move = function() {
      var randomX = Math.floor(Math.random() * (canvasWidth / blockSize));
      var randomY = Math.floor(Math.random() * (canvasHeight / blockSize));
      this.position = [randomX, randomY];
    };
  }

  document.onkeydown = function handleKeyDown(e) {
    var key = e.keyCode;
    var newDirection;

    if (key === 32) {
      gamePaused = !gamePaused;
      if (!gamePaused) {
        refreshCanvas();
      }
    } else {
      switch (key) {
        case 37:
          newDirection = "left";
          break;
        case 38:
          newDirection = "up";
          break;
        case 39:
          newDirection = "right";
          break;
        case 40:
          newDirection = "down";
          break;
        default:
          break;
      }
      snakee.setDirection(newDirection);
    }
  };

  function drawGameOver() {
    ctx.font = "40px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Game Over", canvasWidth / 2 - 100, canvasHeight / 2);
  }
  
  var buttonFacile = document.createElement('button');
  buttonFacile.innerHTML = 'Facile';
  buttonFacile.addEventListener('click', function() {
    delay = 200;
  });
  document.body.appendChild(buttonFacile);

  var buttonMoyenne = document.createElement('button');
  buttonMoyenne.innerHTML = 'Moyenne';
  buttonMoyenne.addEventListener('click', function() {
    delay = 100;
  });
  document.body.appendChild(buttonMoyenne);

  var buttonDifficile = document.createElement('button');
  buttonDifficile.innerHTML = 'Difficile';
  buttonDifficile.addEventListener('click', function() {
    delay = 50;
  });
  document.body.appendChild(buttonDifficile);
};
