const width = 28;
const grid = document.querySelector('.grid');
const scoreDisp = document.querySelector('#score');
let score = 0;
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]
let squares = []
function createBoard(){
    for(let i = 0; i< layout.length; i++){
        const square = document.createElement('div')
        grid.appendChild(square);
        squares.push(square);
        if(layout[i]===0){
            squares[i].classList.add('pac-dot')
        }else if(layout[i]===1){
            squares[i].classList.add('wall')
        }else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        }
        else if(layout[i]===3){
            squares[i].classList.add('power-pellet')
        }
    }
}
createBoard();
let pacmanCurrentIndex = 500

squares[pacmanCurrentIndex].classList.add('pacman')

function control(e){
    squares[pacmanCurrentIndex].classList.remove('pacman')
    switch(e.key){
        case "ArrowUp":
            if (!squares[pacmanCurrentIndex -width].classList.contains('ghost-lair') && !squares[pacmanCurrentIndex - width].classList.contains('wall') && pacmanCurrentIndex - width >=0) pacmanCurrentIndex -= width
            break;
        case "ArrowDown":
            if (!squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') && !squares[pacmanCurrentIndex + width].classList.contains('wall') && pacmanCurrentIndex + width < width * width) pacmanCurrentIndex += width
            break;
        case "ArrowRight":
            if(!squares[pacmanCurrentIndex +1].classList.contains('ghost-lair') && !squares[pacmanCurrentIndex +1].classList.contains('wall') && pacmanCurrentIndex % width < width -1) pacmanCurrentIndex +=1
            if (pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364
            }
            break;
        case "ArrowLeft":
            if(!squares[pacmanCurrentIndex -1].classList.contains('ghost-lair') && !squares[pacmanCurrentIndex -1].classList.contains('wall') && pacmanCurrentIndex % width !==0) pacmanCurrentIndex -=1
            if (pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391
            }
            break;
    }
    squares[pacmanCurrentIndex].classList.add('pacman')
    powerPelletEaten()
    pacdoteaten()
    
}

document.addEventListener("keyup", control);

function pacdoteaten(){
    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisp.innerHTML = score;
    }
}
class Ghost {
    constructor(className, startIndex, speed){
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}
function powerPelletEaten() {
    //if square pacman is in contains a power pellet
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        //add a score of 10
        score +=10
        //change each of the four ghosts to isScared
        ghosts.forEach(ghost => ghost.isScared = true)
        //use setTimeout to unscare ghosts after 10 seconds     
        setTimeout(unScareGhosts, 10000)   
    }
}
function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

const ghost = [ 
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

ghost.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className) 
    squares[ghost.currentIndex].classList.add('ghost')}
);
ghost.forEach(ghost => moveGhost(ghost))
function moveGhost(ghost){
    const directions = [-1,+1, -width, +width];
    let direction = directions[Math.floor(Math.random()*directions.length)]
    ghost.timerId = setInterval(function() {
        //all our code
        //if the next square does NOT contain a wall and does not contain a ghost
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) {
                //remove any ghost
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        // //add direction to current Index
        ghost.currentIndex += direction
        // //add ghost class
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost') 
        } else direction = directions[Math.floor(Math.random() * directions.length)]
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }

    }, ghost.speed )
}





