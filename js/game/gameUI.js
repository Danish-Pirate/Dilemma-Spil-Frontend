class GameUI {

    displayGamePage() {
        $('#end-page').hide();
        $('#lobby-page').hide();
        $('#game-page').show();

    }

    displayLobbyPage() {
        $('#end-page').hide();
        $('#game-page').hide();
        $('#lobby-page').show();
    }


    displayEnd() {
        $('#game-page').hide();
        $('#lobby-page').hide();
        $('#end-page').show();

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