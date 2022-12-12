class Socket {
    disconnect(){
        this.stompClient.disconnect();
    }


    join(lobbyID, player) {
        if (this.socket !== undefined){
            this.disconnect();
        }

        this.lobby = lobbyID
        this.url = "https://dilemmaspiltest.azurewebsites.net/game/" + this.lobby;
        this.socket = new SockJS(this.url);
        this.stompClient = Stomp.over(this.socket);

        $('#lobbyID-display').text(this.lobby);

        this.stompClient.debug = null; // SETS DEBUG MODE OFF

        this.stompClient.connect({}, (frame) => {

            this.stompClient.subscribe( "/topic/answer/value/" + this.lobby, (newValue) => {
                cardAnswer.changeValueDisplay(newValue.body);
            });

            this.stompClient.subscribe( "/topic/answer/importance/" + this.lobby, (newValue) => {
                cardAnswer.changeImportanceDisplay(newValue.body);
            });

            this.stompClient.subscribe('/topic/errors/', (greeting) => {

            });

            this.stompClient.subscribe('/topic/next-card/' + this.lobby, (newCard) => {
                const response  = JSON.parse(newCard.body);


                if (response.gameIsDone){

                    gameUI.displayEnd()

                } else {
                    game.saveAnswer();
                    game.nextRound(response.currentRound);
                }
            });

            this.stompClient.subscribe('/topic/start/game/' + this.lobby, (startGame) => {
                const response  = JSON.parse(startGame.body);

                console.log(response);

                game.setupGame(response)
            });



            this.stompClient.subscribe('/topic/greetings/' + this.lobby, (greeting) => {
                const response  = JSON.parse(greeting.body);

                console.log(greeting.body)


                const playerList = response.gameLobby.playerList;
                playerDisplay.render(playerList);


                let currentRound = response.gameLobby.currentRound;

                // game is started
                if (currentRound !== -1){

                }




            });


            // initial request to game controller
            // checks if created or joined game
            if (player === undefined){
                this.stompClient.send('/app/game/create/' + this.lobby, {}, JSON.stringify({}));
            } else {
                this.stompClient.send('/app/game/' + this.lobby, {}, JSON.stringify(player));
            }
        });



    }


    nextCard(nextCardNumber){
        let stompClient = Stomp.over(socket.socket);
        stompClient.send('/app/game/next-card/' + socket.lobby + '/' + nextCardNumber , {}, JSON.stringify({}));
    }

    startGame(){
        let stompClient = Stomp.over(socket.socket);
        this.stompClient.send('/app/game/start/' + socket.lobby, {}, JSON.stringify({}));
    }

    // to update sliders for all players //
    updateValue(newValue){
        let stompClient = Stomp.over(socket.socket);
        stompClient.send('/app/game/update/value/' + socket.lobby + "/" + newValue, {}, JSON.stringify({}));
    }

    updateImportance(newImportance){
        let stompClient = Stomp.over(socket.socket);
        stompClient.send('/app/game/update/importance/' + socket.lobby + "/" + newImportance, {}, JSON.stringify({}));
    }



}

const socket = new Socket();