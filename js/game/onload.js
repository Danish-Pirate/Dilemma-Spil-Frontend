$( document ).ready(function() {

    gameUI.displayLobbyPage();


    const url = window.location.href;

    let values = getValues(url);

    // join socket
    if(values.isJoined){
        const player = JSON.parse(sessionStorage.getItem('player'));

        socket.join(values.lobbyID, player);

        console.log("IS JOIN")

    } else {
    // create socket

        console.log(values.lobbyID)


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