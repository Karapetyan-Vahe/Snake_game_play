const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("btn");

const ground = new Image();
ground.src = "bg.png";

const foodImg = new Image();
foodImg.src = "food.png";

let box = 32;

let score = 0;

let food = {
    x: parseInt((Math.random() * 17 + 1)) * box,
    y: parseInt((Math.random() * 15 + 3)) * box
}

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
}

document.addEventListener("keydown", direction)

let dir;
function direction(event) {
    if (event.keyCode == 37 && dir != "right") {
        dir = "left";
    } else if (event.keyCode == 38 && dir != "down") {
        dir = "up";
    } else if (event.keyCode == 39 && dir != "left") {
        dir = "right";
    } else if (event.keyCode == 40 && dir != "up") {
        dir = "down";
    }
}


function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 9, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: parseInt((Math.random() * 17 + 3)) * box,
            y: parseInt((Math.random() * 17 + 5)) * box
        }
    } else {
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
        clearInterval(game);
        alert("GAME OVER");
        document.getElementById("relod").style.display = "inline"
    } else if (score == 10) {
        alert("Winner");
        clearInterval(game);
        document.getElementById("relod").style.display = "inline"

    }

    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)
}



let game = setInterval(drawGame, 100);

