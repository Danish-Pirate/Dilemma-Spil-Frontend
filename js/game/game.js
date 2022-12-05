class Game {


    startGame(){
        socket.startGame();
    }


    setupGame(cardPackage) {
        gameUI.displayGamePage()

        this.currentRound = cardPackage.currentRound;
        this.dilemmaCards = cardPackage.cardPackage.dilemmaModels;

        this.gameName = cardPackage.cardPackage.enName;
        this.totalCards = this.dilemmaCards.size;

        this.nextCard()
    }

    nextRound(newRound){
        this.currentRound = newRound;
        this.nextCard();
    }

    forwardOneCard(){
        this.currentRound++;
        socket.nextCard(this.currentRound);
    }
    backOneCard(){
        this.currentRound--;
        socket.nextCard(this.currentRound);
    }




    // render card
    nextCard(){
        let dilemmaCard = this.dilemmaCards[this.currentRound];

        // render object
        let newCard = new RenderCard(dilemmaCard)
        newCard.renderCard($('#card-body'));
    }



}

const game = new Game();

