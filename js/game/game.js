class Game {


    saveAnswer(){
        this.dilemmaCards[this.currentRound].gameAnswersModels[0] = {
            dilemmaDifficulty: $('#dilemma-importance').val(),
            discussionQuality: $('#dilemma-value').val()
        };
    }


    startGame(){
        socket.startGame();
    }


    setupGame(gameLobby) {
        gameUI.displayGamePage()

        console.log(gameLobby);

        this.gameLobby = gameLobby;

        this.currentRound = gameLobby.currentRound;
        this.dilemmaCards = gameLobby.cardPackage.dilemmaModels;



        this.currentCard = this.dilemmaCards[this.currentRound];
        this.gameName = gameLobby.cardPackage.enName;
        this.totalCards = this.dilemmaCards.length;

        this.nextCard();
    }

    nextRound(newRound){
        this.currentRound = newRound;
        this.nextCard();
    }

    forwardOneCard(){
        this.currentRound++;

        if (this.currentRound <= this.totalCards){

            socket.nextCard(this.currentRound);
        } else {
            this.gameLobby.cardPackage.dilemmaModels = this.dilemmaCards;

            /*
                api("api/post/save/lobbyStats","POST", this.gameLobby).then(response => {
                    console.log(response);
                });
             */



            socket.nextCard(this.currentRound);
        }

        // tells server to load new card for all players in lobby



    }
    backOneCard(){
        if (this.currentRound !== 0){
            this.currentRound--;
            socket.nextCard(this.currentRound);
        }

    }

    // render card
    nextCard(){
        let dilemmaCard = this.dilemmaCards[this.currentRound];

        // render object
        this.newCard = new RenderCard(dilemmaCard)
        this.newCard.renderCard($('#card-body'));
    }
    renderForAgainstText(){
        $('#for-text').text(this.newCard.dilemmaCard.hintFor);
        $('#against-text').text(this.newCard.dilemmaCard.hintAgainst);
    }

    endGame(){
        gameUI.displayEnd();
    }
}

const game = new Game();