class CardAnswer{

    changeImportanceDisplay(newValue){
        $('#field-dilemma-importance').text(newValue)
        $('#dilemma-importance').val(newValue)
    }

    changeValueDisplay(newValue){
        $('#field-dilemma-value').text(newValue)
        $('#dilemma-value').val(newValue)
    }
}

const cardAnswer = new CardAnswer();

$( document ).ready(function() {
    $("#dilemma-value").change(function () {
        let field = $("#dilemma-value");
        socket.updateValue(field.val())
    });

    $("#dilemma-importance").change(function () {
        let field = $("#dilemma-importance");
        socket.updateImportance(field.val())
    });

});
