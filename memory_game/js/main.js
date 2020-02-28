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

const cardsInPlay = [];

function createBoard() {
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

/* function addReset() {
    let resetButton = document.createElement('a');
    resetButton.innerHTML = "Reset board";
    resetButton.addEventListener('click', createBoard);
    document.getElementById('reset').appendChild(resetButton);
} */

function flipCard() {
    let cardId = this.getAttribute('data-id');
    console.log("User flipped " + cards[cardId].rank);
    console.log(cards[cardId].cardImage);
    console.log(cards[cardId].suit);
    cardsInPlay.push(cards[cardId].rank);
    this.setAttribute('src',cards[cardId].cardImage);
    if (cardsInPlay.length === 2) {
        setInterval(checkForMatch(), 2000);
    }
}

createBoard();
