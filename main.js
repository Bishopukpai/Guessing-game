/***Selecting DOM elements */
const squares = document.querySelectorAll('.square')
const answerDisplay = document.querySelector('.correct')
let scoreDisplay = document.getElementById("score-display");
const colourDisplay = document.querySelector('h1')
const button = document.querySelector("button")
let resetButton = document.getElementById("reset-btn"); 

let score = 0;

let colours = [];
GenerateRandomColor();

assign_colors();

checkColour()

function GenerateRandomColor(){
    for (let i = 0;  i < squares.length; i++){
        colours.push(
            `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
        );
    }
}

function assign_colors(){
    colours.forEach((colour, index) => {
        squares[index].style.background = colour
        squares[index].setAttribute('data-colour', colour)
    })
}

function getRandomPickedColour(){
    const randomColour = colours[Math.floor(Math.random() * colours.length)]

    colourDisplay.textContent = randomColour
    return randomColour
}

function checkColour(){
    squares.forEach(square => {
        square.addEventListener("click", e => {
            if(e.target.dataset.colour === pickedColour){
                answerDisplay.textContent = '✅ Correct'
                answerDisplay.style.color = "green";

                score += 1;
                scoreDisplay.textContent = `Score: ${score} 🚀 🎉`;
                
               
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });

                reset()
                
            }else {
                answerDisplay.textContent = 'Wrong'
                answerDisplay.style.color = "red";
                e.target.classList.add('fade') 
               
            }
        })
    })
}

let pickedColour =  getRandomPickedColour() 
function reset(){
    colours = []
    GenerateRandomColor();

    squares.forEach((square) => square.classList.remove('fade'))

    assign_colors();

    pickedColour = getRandomPickedColour() 
}

function resetGame() {
    score = 0; 
    scoreDisplay.textContent = `Score: ${score}`; 
    answerDisplay.textContent =''

    squares.forEach(square => {
        square.classList.remove("fade");
    });

    pickedColour =  getRandomPickedColour() 
}

resetButton.addEventListener("click", resetGame);


button.addEventListener('click', reset)