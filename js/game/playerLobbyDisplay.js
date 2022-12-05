class PlayerLobbyDisplay {
    constructor() {
    }

    render(playerList){
        $('.player-display').remove();

        console.log(JSON.stringify(playerList))

        playerList.forEach((player) =>
        {

            let playerDisplay = $('#playerList');

            let listItem = $("<li></li>").addClass("list-group-item player-display");
            let listName = $("<p>" + player.name + "</p>").addClass("m-0");
            listItem.append(listName);

            playerDisplay.append(listItem);

        });
    }

    renderSinglePlayer(player){


    }
}

const playerDisplay = new PlayerLobbyDisplay();