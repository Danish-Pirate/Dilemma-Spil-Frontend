$( document ).ready(function() {

    gameUI.displayLobbyPage()



    const url = window.location.href;

    let values = getValues(url)

    $('#lobby-id').text(values.lobbyID);


    // join socket
    if(values.isJoined){
        const player = JSON.parse(sessionStorage.getItem('player'));

        socket.join(values.lobbyID, player);


    } else {
    // create socket

        socket.join(values.lobbyID)
    }
});


function getValues(url){
    let seperatedUrl = url.split('?');

    const values = seperatedUrl[1];

    if(values.includes("&")) {
        // is joined
        let split = values.split("&");
        let isJoined = split[1];


        if (isJoined === 'join-game') {
            return {
                "lobbyID": split[0],
                "isJoined": true

            }
        }
    }

    return {
        "lobbyID": values,
        "isJoined": false
    }

}