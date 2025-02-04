/*** Selecting DOM elements ***/
const squares = document.querySelectorAll('.square'); // Selects all squares in the game
const answerDisplay = document.querySelector('.correct'); // Displays whether the answer is correct or wrong
let scoreDisplay = document.getElementById("score-display"); // Displays the current score
const colourDisplay = document.querySelector('h1'); // Displays the target color to guess
const button = document.querySelector("button"); // Button to reset the round
let resetButton = document.getElementById("reset-btn"); // Button to reset the entire game

let score = 0; // Initializes the score to 0
let colours = []; // Array to store randomly generated colors

// Generate random colors and assign them to squares
GenerateRandomColor();
assign_colors();

// Start listening for color selection
checkColour();

/*** Function to generate random RGB colors ***/
function GenerateRandomColor(){
    for (let i = 0; i < squares.length; i++){
        colours.push(
            `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
        ); // Generates a random RGB color and stores it in the array
    }
}

/*** Function to assign colors to squares ***/
function assign_colors(){
    colours.forEach((colour, index) => {
        squares[index].style.background = colour; // Sets square background color
        squares[index].setAttribute('data-colour', colour); // Stores the color in a data attribute
    });
}

/*** Function to randomly select a target color ***/
function getRandomPickedColour(){
    const randomColour = colours[Math.floor(Math.random() * colours.length)]; // Selects a random color
    colourDisplay.textContent = randomColour; // Displays the target color in the UI
    return randomColour; // Returns the selected color
}

/*** Function to check if the clicked color is correct ***/
function checkColour(){
    squares.forEach(square => {
        square.addEventListener("click", e => {
            if(e.target.dataset.colour === pickedColour){ // If the clicked color matches the target color
                answerDisplay.textContent = '✅ Correct'; // Display "Correct" message
                answerDisplay.style.color = "green";

                score += 1; // Increment the score
                scoreDisplay.textContent = `Score: ${score} 🚀 🎉`; // Update score display
                
                // Celebration effect using confetti
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });

                reset(); // Start a new round
            } else {
                answerDisplay.textContent = 'Wrong'; // Display "Wrong" message
                answerDisplay.style.color = "red";
                e.target.classList.add('fade'); // Fade out incorrect selection
            }
        });
    });
}

// Pick a random color for the first round
let pickedColour = getRandomPickedColour();

/*** Function to reset for a new round ***/
function reset(){
    colours = []; // Clear the colors array
    GenerateRandomColor(); // Generate new colors

    // Remove fade effect from all squares
    squares.forEach((square) => square.classList.remove('fade'));

    assign_colors(); // Assign new colors to squares
    pickedColour = getRandomPickedColour(); // Pick a new target color
}

/*** Function to reset the entire game ***/
function resetGame() {
    score = 0; // Reset score
    scoreDisplay.textContent = `Score: ${score}`; // Update score display
    answerDisplay.textContent = ''; // Clear answer message

    squares.forEach(square => {
        square.classList.remove("fade"); // Remove fade effect
    });

    pickedColour = getRandomPickedColour(); // Pick a new target color
}

// Add event listener to reset game button
resetButton.addEventListener("click", resetGame);

// Add event listener to reset round button
button.addEventListener('click', reset);
