class GameUI {

    displayGamePage() {
        showPage('game-page:link')
    }

    displayLobbyPage() {
        showPage('lobby-page:link')

    }

    displayEnd() {
        showPage('end-page:link')
    }

    displayCommentModal() {
        $('#modal-comment').modal('show');
        $("#modal-comment-field").val('');
        $("#dilemma-comment").submit(function (event) {

            let formData = $('#dilemma-comment').serializeArray();
            let data = formCleaner.cleanFormData(formData);

            let card = game.currentCard;

            let url = "api/post/create/" + card.id + "/commentsdilemma";

            api(url, "POST", data).then(response => {
            });

            event.preventDefault();
            $('#modal-comment').modal('hide');
        });
    }


    displayHintsModal() {
        $('#modal-hint').modal('show');

        game.renderForAgainstText();
    }


}

const gameUI = new GameUI();



function showPage(linkID) {
    document.getElementById(linkID).classList.remove("disabled");

    resetPages();
    disableAllActiveClass();

    document.getElementById(linkID).classList.add("active");
    document.getElementById(linkID).classList.add("text-dark");


    let pageID = linkID.split(":");
    $('#' + pageID[0]).show();
}

function disableAllActiveClass() {
    $('.nav-link').removeClass("active");
}
function resetPages() {
    $('.content-page').hide();
}

