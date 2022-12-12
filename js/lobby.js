class Lobby {
    createLobby(event) {
        event.preventDefault();
        let formData = $('#create-lobby').serializeArray();

        let data = formCleaner.cleanFormData(formData);




        api("api/post/create/lobby" +  "?cardPackageID=1", "POST", data).then(response => {
            const lobbyCode = response.lobbyCode;

            const player = response.gameLobby;


            sessionStorage.setItem("player", JSON.stringify(player));

            console.log("connected to: " + lobbyCode);


            // IF GAME NO WORD CHECK THAT URL MATCHES

            //
            //window.location.href = 'http://127.0.0.1:5500/html/game.html' + "?" + lobbyCode;
            window.location.href = 'https://lively-pond-0744c3603.2.azurestaticapps.net/Frontend%20Dillemmaspillet/html/game.html' + "?" + lobbyCode;


        });
    }

    joinLobby(event) {
        event.preventDefault()
        let formData = $('#lobby-exist').serializeArray();
        let data = formCleaner.cleanFormData(formData);

        const player =
            {
                fieldOfStudy: data.fieldOfStudy,
                name: data.name,
                isReady: false
            }


        api("api/get/read/lobbyExist/" + data.lobbyID, "GET").then(response => {
            console.log("LOBBY:  " + JSON.stringify(response.gameLobby));
            const gameLobby = response.gameLobby;


            if (response.gameLobby != null) {
                sessionStorage.setItem("player", JSON.stringify(player));

                // IF GAME NO WORD CHECK THAT URL MATCHES
                // window.location.href = 'http://127.0.0.1:5500/html/game.html' + "?" + gameLobby.lobbyCode + "&join-game";

                window.location.href = 'https://lively-pond-0744c3603.2.azurestaticapps.net/Frontend%20Dillemmaspillet/html/game.html' + "?" + gameLobby.lobbyCode + "&join-game";


                //socket.join(gameLobby.lobbyCode, player);

                console.log("connected to: " + gameLobby.lobbyCode);
            } else {
                console.log("Gamelobby does not exist");
            }
        });
    }

    fetchAllLobby(event) {
        event.preventDefault()

        api("api/get/all/lobby", "GET").then(response => {
            console.log(JSON.stringify(response));
        })


    }
}

const lobby = new Lobby();