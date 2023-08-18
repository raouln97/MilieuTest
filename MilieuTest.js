const cardValues = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
const cardSuits = ["diamonds", "hearts", "clubs", "spades"]
const scoreBoard = new Map
const numOfCardsInDeck = 52

function CompareCards(card1, card2){

    if(cardValues.indexOf(card1.cardValue) > cardValues.indexOf(card2.cardValue)){
        return card1
    }
    else if (cardValues.indexOf(card2.cardValue) > cardValues.indexOf(card1.cardValue)){
        return card2
    }
    else{
        return cardSuits.indexOf(card2.cardSuit) > cardSuits.indexOf(card1.cardSuit) ? card2 : card1
    }

}

function CreateDeck(numOfDecks){
    const deck = []
    for (let countOfDecks = 0; countOfDecks < numOfDecks; countOfDecks++){
        for (const cardValue of cardValues){
            for (const cardSuit of cardSuits){
                deck.push({cardValue, cardSuit})
            }
        }
    }

    return deck
}

function DrawCards(deck){
    const cardsDrawn = []
    for (let [players, score] of scoreBoard) {
        if (deck.length == 0){
            break;
        }

        const index = Math.floor(Math.random() * deck.length)
        const playersCard = deck.splice(index,1)[0]
        console.log(`${players}: ${playersCard.cardValue} of ${playersCard.cardSuit}`)
        cardsDrawn.push(playersCard)


        // break if a player draws card index = last card in deck(Highest possible card) since subsequent players will not draw on that turn
        if (index === (deck.length)){
            break;
        }
        }

    return cardsDrawn

}



function PlayGame(deck){
    let numOfRounds = 1
    let playingDeck = deck
    
    while(deck.length > 0){
        console.log(`\nRound ${numOfRounds}`)
        const cardsDrawn = DrawCards(playingDeck)
        const winningCard = cardsDrawn.reduce(CompareCards)
        console.log("winningCard:", winningCard)
        const winningPlayerIndex = cardsDrawn.indexOf(winningCard)
        let winningPlayerScore = scoreBoard.get(`Player ${winningPlayerIndex + 1}`)
        scoreBoard.set(`Player ${winningPlayerIndex + 1}`, winningPlayerScore+=1)
        numOfRounds++;
    }

}


async function InitGame(numOfPlayers, numOfDecks){
    //Initialise scoreboard
    for (let count = 1; count <= numOfPlayers; count++){
        scoreBoard.set(`Player ${count}`, 0)
    }
    const deck = CreateDeck(numOfDecks)
    PlayGame(deck)
    const scores = new Map([...scoreBoard.entries()].sort((a,b) => b[1] - a[1]))
    console.log(scores)
    
}

InitGame(8,2)

