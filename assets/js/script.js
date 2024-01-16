/**
 * The main game function that initializes the game and contains all the game logic.
 */
function game() {// all functions contained within a single function, as resources I used advised
    // All variables defined here
    const actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const userWinResults = ['scissorspaper', 'paperrock', 'rocklizard', 'lizardspock', 'spockscissors',
    'rockscissors', 'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'];
    let userChoice = '';
    let compChoice = '';
    const userChoiceElement = document.querySelector('.user-choice');
    const pickedElement = document.querySelector('.picked');
    const userPickElement = document.querySelector('.user-pick');
    const pcPickElement = document.querySelector('.pc-pick');
    const resultElement = document.querySelector('.result');
    const resultTitleElement = resultElement.querySelector('.title');
    const scoreCountElement = document.querySelector('.score-count');

    let currentScore = null;

    window.addEventListener('load', () => {
        retrieveScoreFromLocalStorage();
    
        document.querySelectorAll('.user-choice .game-card').forEach(card => {
            card.addEventListener('click', (ev) => {
                userChoice = getUserChoice(ev.target);
                compChoice = getComputerChoice();
    
                startGame();
            });
        });

        resultElement.querySelector('button').addEventListener('click', tryAgain);
    
    });
    /**
     * This function is called when the page has fully loaded, ready for the user's input.
     */
    function startGame() {
        calculateWinner(userChoice, compChoice);
        userChoiceElement.classList.add('hidden');
        pickedElement.classList.remove('hidden');
        clearResultBeforeAppend();
        buildChoiceElement(true, userChoice);
        buildChoiceElement(false, compChoice);
    }
 /**
     * This function handles the user's choice when a game option is clicked.
     * @param {HTMLElement} target - The clicked element representing the user's choice.
     * @returns {string} - The user's selected game option (e.g., 'rock', 'paper', 'scissors', 'lizard', 'spock').
     */
    function getUserChoice(target) {
        if (target.nodeName === 'IMG') {
            return target.parentElement.classList[1];
        }
        return target.classList[1];
    }
/**
     * This function randomly selects a game option for the computer.
     * @returns {string} - The computer's randomly selected game option.
     */
        function getComputerChoice() {
        return actions[Math.floor(Math.random() * 5)];
    }
/**
     * This function calculates the winner of the game and updates the score.
     * @param {string} user - The user's selected game option.
     * @param {string} comp - The computer's selected game option.
     */
        function calculateWinner(user, comp) {
        if (user === comp) {
            resultTitleElement.innerText = 'Tie';
        } else if (getUserWinsStatus(user + comp)) {
            resultTitleElement.innerText = 'You win';
            calculateScore(1);
        } else {
            resultTitleElement.innerText = 'You lose';
            calculateScore(-1);
        }
    }
         /**
     * This function checks if the user wins based on the game result.
     * @param {string} result - The concatenated string of user and computer choices (e.g., 'rockscissors').
     * @returns {boolean} - True if the user wins, false otherwise.
     */

    function getUserWinsStatus(result) {
        return userWinResults.some(winStr => winStr === result);
    }
   /**
     * This function builds and appends choice elements to the modal section.
     * @param {boolean} isItUserElement - True if it's the user's choice element, false for the computer's.
     * @param {string} className - The class name representing the game option (e.g., 'rock', 'paper', 'scissors', 'lizard', 'spock').
     */    
    function buildChoiceElement(isItUserElement, className) {
        const el = document.createElement('div');
        el.classList = [`game-card ${className}`];
        el.innerHTML = `<img src="assets/images/icon-${className}.svg" alt="${className}">`;
        if (isItUserElement) {
            userPickElement.append(el);
        } else {
            pcPickElement.append(el);
        }
    }
       /**
     * This function handles the "Try Again" button click, showing the user's choice element and hiding the result.
     */

    function tryAgain() {
        userChoiceElement.classList.remove('hidden');
        pickedElement.classList.add('hidden');
    }
         
    /**
     * This function clears the result elements before appending new ones.
     */

    function clearResultBeforeAppend() {
        userPickElement.innerHTML = '';
        pcPickElement.innerHTML = '';
    }
     /**
     * This function calculates and updates the game score based on the round result.
     * @param {number} roundResult - The result of the current round (-1 for loss, 0 for tie, 1 for win).
     */
    function calculateScore(roundResult) {
        currentScore += roundResult;
        updateScoreBoard();
    }
    /**
     * Retrieves the game score from local storage and updates the current score.
     */
    function retrieveScoreFromLocalStorage() {
        const score = +window.localStorage.getItem('gameScore') || 0;
        currentScore = score;
        updateScoreBoard();
    }
    /**
     * Updates the score displayed on the scoreboard and stores it in local storage.
     */

    function updateScoreBoard() {
        scoreCountElement.innerText = currentScore;
        window.localStorage.setItem('gameScore', currentScore);
    }

    // Modal
    const rulesBtn = document.querySelector('.rules-btn');
    const modalBg = document.querySelector('.modal-bg');
    const modal = document.querySelector('.modal');
      /**
     * Event listener for the "Rules" button click, showing the rules modal.
     */
    rulesBtn.addEventListener('click', () => {
        modal.classList.add('active');
        modalBg.classList.add('active');
    });

      /**
     * Event listener for the modal background click, hiding the modal.
     * @param {Event} event - The click event.
     */
    modalBg.addEventListener('click', (event) => {
        if (event.target === modalBg) {
            hideModal();
        }
    });
      
      /**
     * Event listener for the modal close button click, hiding the modal.
     */
    document.querySelector('.close').addEventListener('click', hideModal);
    
    /**
    * Hides the rules modal.
    */
    function hideModal() {
        modal.classList.remove('active');
        modalBg.classList.remove('active');  
    }
}
// Event listener for when the DOM content has fully loaded, starting the game.

document.addEventListener("DOMContentLoaded", function () {
    game();
});