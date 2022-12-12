class PlayerLobbyDisplay {

    render(playerList){
        $('.player-display').remove();

        playerList.forEach((player) =>
        {

            let playerDisplay = $('#playerList');

            let listItem = $("<li></li>").addClass("list-group-item player-display");
            let listName = $("<p>" + player.name + "</p>").addClass("m-0");
            listItem.append(listName);

            playerDisplay.append(listItem);


        });
    }

}

const playerDisplay = new PlayerLobbyDisplay();