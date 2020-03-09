console.log("Up and running");

// Define cards
const cards = [
    {
        rank: "queen",
        suit: "hearts",
        cardImage: "images/queen-of-hearts.png"
    },
    {
        rank: "queen",
        suit: "diamonds",
        cardImage: "images/queen-of-diamonds.png"
    },
    {
        rank: "king",
        suit: "hearts",
        cardImage: "images/king-of-hearts.png"
    },
    {
        rank: "king",
        suit: "diamonds",
        cardImage: "images/king-of-diamonds.png"
    }    
];

const cardsRandom = [];
const cardsInPlay = [];
let cardIdPrevious = 0;

function randomiseCards() {
    for (let i = 0; i < cards.length; i++) {
        let randomId = Math.floor(Math.random() * cards.length);
        while (cards[randomId] === cardsRandom[0] || cards[randomId] === cardsRandom[1] || cards[randomId] === cardsRandom[2] || cards[randomId] === cardsRandom[3]) {
            randomId = Math.floor(Math.random() * cards.length);
        }
        cardsRandom[i] = cards[randomId];
    }
}

function createBoard() {
    randomiseCards();
    console.log(cardsRandom);
    for (let i = 0; i < cards.length; i++) {
        let cardElement = document.createElement('img');
        cardElement.setAttribute('src', "images/back.png");
        cardElement.setAttribute('data-id', i);
        cardElement.addEventListener('click', flipCard);
        document.getElementById('game-board').appendChild(cardElement);   
    }
}

function checkForMatch() {
    if (cardsInPlay[0] === cardsInPlay[1]) {
        console.log("You found a match!");
        setTimeout(function(){alert("You found a match!");}, 200);
    } else {
        console.log("Sorry, try again.");
        setTimeout(function(){alert("Sorry, try again.");}, 200);
    }
}

function addReset() {
    let resetButton = document.createElement('p');
    resetButton.innerHTML = "Reset board";
    resetButton.setAttribute('id', "reset-button");
    resetButton.addEventListener('click', resetBoard);
    document.getElementById('reset-board').appendChild(resetButton);
}

function resetBoard() {
    console.log('reset button clicked');
    for (let i = 0; i < cards.length; i++) {
        let cardElement = document.getElementsByTagName('img')[i];
        cardElement.setAttribute('src', "images/back.png");
        console.log("card " + i + " has been reset"); 
        cardsInPlay.pop();  
        cardsRandom.pop();
    }
    randomiseCards();
    document.getElementById('reset-board').removeChild(document.getElementById('reset-button'));
    console.log("board has been reset, reset button removed");
}

function flipCard() {
    let cardId = this.getAttribute('data-id');
    console.log("User flipped " + cardsRandom[cardId].rank);
    console.log(cardsRandom[cardId].cardImage);
    console.log(cardsRandom[cardId].suit);
    cardsInPlay.push(cardsRandom[cardId].rank);
    this.setAttribute('src',cardsRandom[cardId].cardImage);
    if (cardsInPlay.length === 1) {
        cardIdPrevious = cardId;
    } else if ((cardsInPlay.length === 2) && (cardId == cardIdPrevious)) {
        cardsInPlay.pop();
        cardIdPrevious = cardId;
    } else if ((cardsInPlay.length === 2) && (cardId !== cardIdPrevious)) {
        setInterval(checkForMatch(), 2000);
    }
    if (document.getElementById('reset-button') === null) {
        console.log("reset button created")
        addReset();
    }
}

createBoard();
