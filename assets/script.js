
var ground = document.querySelector('canvas');
var square = 25
var cols = 25
var rows = 20
var context

// snake head
snakex = square * 15
snakey = square * 4

//food
var foodx
var foody

//shit for moving the snake
velocityy = 0
velocityx = 0

// array that contains the body of the snake
var snakebody = []

//score stuffs
var score = 0
var res = document.querySelector("#score")

var highscore = 0
var highres = document.querySelector("#highscore")

//game over
var gameover = false



window.onload = () => {

    ground.width = cols * square;
    ground.height = rows * square;
    context = ground.getContext('2d');

    foodplace();
    setInterval(update, 1000 / 10)

    document.addEventListener("keyup", changedir)
}

const update = () => {
    if (gameover){
        return
    }

    // fill the ground
    context.fillStyle = 'grey';
    context.fillRect(0, 0, ground.width, ground.height);
    
    // draw the food
    context.beginPath();
    context.arc(foodx + square / 2, foody + square / 2, square / 2, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();

    //check if the snake eats the food
    if (snakex == foodx && snakey == foody){
        snakebody.push([snakex, snakey])
        foodplace();

        // increament the score
        score+=10
        res.innerHTML = score
    }

    //move the snake along with the body parts
    for(i = snakebody.length - 1; i > 0; i--){
        snakebody[i] = snakebody[i - 1]
    }
    if(snakebody.length){
        snakebody[0] = [snakex, snakey]
    }
    
    // draw the snake
    context.fillStyle = '#222';
    snakex += velocityx * square
    snakey += velocityy * square
    context.fillRect(snakex, snakey, square, square);

    //draw the body
    context.fillStyle = 'black';
    
    //draw the rest appended body
    for(i = 0; i < snakebody.length; i++){
        context.fillRect(snakebody[i][0], snakebody[i][1], square, square);
    }

    // when the snake is out of grounds
    if(snakex < 0 || snakex >= ground.width || snakey < 0 || snakey >= ground.height){
        gameover = true
        alert("Game Over")
        location.reload()
    }
    
    // when the snake bumps into itself
    for(i = snakebody.length -1; i > 0; i--){
        if(snakebody[0][0] == snakebody[i][0] && snakebody[0][1] == snakebody[i][1]){
            gameover = true
            alert("Game Over")
            location.reload()
        }
    }

    
}

const foodplace = () => {
    foodx = Math.floor(Math.random() * cols) * square
    foody = Math.floor(Math.random() * rows) * square
}

const changedir = (e) => {
    if (e.code == "ArrowUp" && velocityy != 1){
        velocityx = 0
        velocityy = -1
    }
    else if (e.code == "ArrowDown" && velocityy != -1){
        velocityx = 0
        velocityy = 1
    }
    else if (e.code == "ArrowLeft" && velocityx != 1){
        velocityx = -1
        velocityy = 0
    }
    else if (e.code == "ArrowRight" && velocityx != -1){
        velocityx = 1
        velocityy = 0
    }
}

