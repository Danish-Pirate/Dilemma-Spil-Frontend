class RenderCard{

    /* JSON MODEL FOR CARD

       {
            "id": 3,
            "daName": "Computer",
            "enName": "Mac or Windows Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            "daDescription": "Mac eller Windows",
            "enDescription": "Computer",
            "commentsDilemmaModels": [],
            "gameAnswersModels": [],
            "hintsDilemmaModels": []
        }
    */

    constructor(dilemmaJSON, isDanish) {
        this.dilemmaCard = this.filterCardLanguage(isDanish, dilemmaJSON);
    }

    // filters card for import information
    filterCardLanguage(isDanish, uncleanDilemma){
        let newJSON;

        if (isDanish){
            newJSON = {
                name: uncleanDilemma.daName,
                description: uncleanDilemma.daDescription,
            }
        } else {
            newJSON = {
                name: uncleanDilemma.enName,
                description: uncleanDilemma.enDescription,
            }

        }

        return newJSON;
    }

    // uses jquery
    renderCard(appendTo){
        appendTo.empty();

        let header = $('<div></div>');
        let h1 = $('<h1></h1>').text(this.dilemmaCard.name);

        header.append(h1);

        let body = $('<div></div>');
        let bodyDescription = $('<div></div>').addClass('w-75');
        let description = $('<p></p>').text(this.dilemmaCard.description);


        bodyDescription.append(description);
        body.append(bodyDescription);


        appendTo.append(header);
        appendTo.append(body);
    }

/*
    <!-- HEADER -->
    <div>
        <h1>Dilemmacard 1:</h1>
    </div>

    <!-- BODY -->
    <div>
        <div class="w-75">
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
        </div>
    </div>
 */




}