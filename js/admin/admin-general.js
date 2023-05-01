/* does not take care of security currently */
function backToIndex(){
    window.location.href = "http://127.0.0.1:5500/html/index.html";
  }

function resetPage() {
    let dilemma = document.getElementById("dilemma-page");
    let packages = document.getElementById("package-page")
    let statistics = document.getElementById("statistics-page");
    let feedback = document.getElementById("feedback-page");

    dilemma.style.display = "none";
    packages.style.display = "none";
    statistics.style.display = "none";
    feedback.style.display = "none";
}

function renderDilemmas() {
    var x = document.getElementById("dilemma-page");
    
    resetPage();
    
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    renderDilemmaList();
}

function renderPackages() {
    var x = document.getElementById("package-page");
    
    resetPage();
    
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    
    /* console.log("before render packagelist"); */

    renderPackageList();

}

function renderStatistics() {
    var x = document.getElementById("statistics-page");
    
    resetPage();
    
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    
    renderGeneralStats();
}

function renderFeedback() {
    var x = document.getElementById("feedback-page");
    
    resetPage();
    
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }   

    renderGeneralFeedback();
}

function renderDilemmaList(){
    
    $('#dilemma-info').empty();

    $('#dilemma-info').css("column-count", 1);

    for(let i = 0; i < dilemmaList.length; i++){

    let dilemmaNameLink = '<button class="dilemma-name-buttons" onclick="renderEditDilemmaForm(' + dilemmaList[i].id +')">'+ dilemmaList[i].daName + '</button>'

    $('#dilemma-info').append(dilemmaNameLink);

    }
}

function renderDilemmasForFeedback(){
    
    $('#feedback-info').empty();

    $('#feedback-info').css("column-count", 1);

    for(let i = 0; i < dilemmaList.length; i++){

    let dilemmaNameLink = '<button class="dilemma-name-buttons" onclick="renderComments(' + dilemmaList[i].id +')">'+ dilemmaList[i].daName + '</button>'

    $('#feedback-info').append(dilemmaNameLink);

    }
}

function renderEditDilemmaForm(id){
    
    let currentDilemma;
    let hint;
    let dilemmaHints;

    /* removes previous rendered html */
    $('#dilemma-info').empty();

    for(let i = 0; i < dilemmaList.length; i++){

        if(dilemmaList[i].id === id){
        currentDilemma = dilemmaList[i]; 
        }
    };

    /* console.log(dilemmaIdHintsListMap.size); */

    hint = dilemmaIdHintsListMap.get(currentDilemma.id);   

    let dilemmaForm = '<div id="dilemma-form"><form onsubmit="editDilemma(event, ' + currentDilemma.id + ')"><label for="daName">Dansk navn:  </label> <input type="text" id="daName" value="'
     + currentDilemma.daName + '"><label for="enName">Engelsk navn:  </label> <input type="text" id="enName" value="'
     + currentDilemma.enName +'"><br><div id="danish-dilemma-description"></div><label for="daDescription">Dansk dilemma tekst:  </label><input type="text" id="daDescription" value="' + currentDilemma.daDescription +
      '"><br><div id="english-dilemma-description"></div><label for="enDescription">Engelsk dilemma tekst:  </label><input type="text" id="enDescription" value="' 
      + currentDilemma.enDescription + '"> <input class="dilemma-submit-button" type="submit" value="Opdater"></form></div>' ;
    
    if(hint !== undefined){
     dilemmaHints = '<div id="hints-form"><form onsubmit="editHints(event, ' + hint.id + ')"><label for="daHintFor">Dansk hint +</label><input type="text" id="daHintFor" value="'+hint.daForHint+'"' +  hint.daForHint
        + '"><label for="daHintFor">Dansk hint -</label><input type="text" id="daHintAgainst" value="'+hint.daAgainstHint+'"' +  hint.daAgainstHint
        + '"><br><label for="daHintFor">Engelske hint +</label><input type="text" id="enHintFor" value="'+hint.enForHint+'"' +  hint.enForHint
        + '"><label for="daHintFor">Engelsk hint -</label><input type="text" id="enHintAgainst" value="'+hint.enAgainstHint+'"' + hint.enAgainstHint + '"><input class="dilemma-submit-button" type="submit" value="Opdater"></form></div>' ;  
    }

    let hintsButton = '<div><form onsubmit="addHints('+ currentDilemma.id +')"><input type="submit" value="Tilføj hints"></form></div>';


        /* comments here perhaps maybe better as a separate tab on the page 
     let commentsForm = '<div><form><label for="comments">Kommentarer</label><input type="text" id="comments" value=""' ;
    */

     /* style here */
     $('#dilemma-info').css("column-count", 1);     


    $('#dilemma-info').append(dilemmaForm);
    $('#danish-dilemma-description').append(currentDilemma.daDescription);
    $('#english-dilemma-description').append(currentDilemma.enDescription);


    if(hint !== undefined){
    $('#dilemma-info').append(dilemmaHints);
    }
    else{
        $('#dilemma-info').append(hintsButton); 
    }

    /* clear previous uses */
    hintBody = "";
    dilemmaBody = "";
}

function addNewDilemma(){

    $('#dilemma-info').empty();

    let addDilemmaForm = '<div class="create-dilemma-form"><form onsubmit="createNewDilemma(event)"><label for="addDaName">Dansk navn</label> <input type="text" id="addDaName" value="" required><label for="addEnName">Engelsk navn</label> <input type="text" id="addEnName" value="" required>' +
    '<br><br><textarea placeholder="Dansk dilemma tekst" class="dilemma-input-text-field" name="addDaDescription" id="addDaDescription" value="" required></textarea><br><textarea class="dilemma-input-text-field" name="addEnDescription" id="addEnDescription" placeholder="Engelsk dilemma tekst" value="" required>'+
    '</textarea><br><input class="dilemma-submit-button" type="submit" value="Opret"></form></div>' ;

    $('#dilemma-info').css("column-count", 1);   

    $('#dilemma-info').append(addDilemmaForm);

    dilemmaBody = "";
}

function addHints(dilemmaId){

    $('#dilemma-info').empty();

    let hintsForm = '<div><form onsubmit="createNewHints(event,'+ dilemmaId +')"><label for="createDaFor">Dansk hint +</label> <input type="text" id="createDaFor" value="" required><label for="createDaAgainst">Dansk hint -</label> <input type="text" id="createDaAgainst" value="" required>'+
    '<label for="createEnFor">Engelsk hint +</label> <input type="text" id="createEnFor" value="" required><label for="createEnAgainst">Engelsk hint -</label> <input type="text" id="createEnAgainst" value="" required><input class="dilemma-submit-button" type="submit" value="Tilføj"></form></div>';

    $('#dilemma-info').append(showDilemmaTextOnly(dilemmaId));
    $('#dilemma-info').append(hintsForm);

}

function showDilemmaTextOnly(dilemmaId){

    let currentDilemma;

    for(let i = 0; i < dilemmaList.length; i++){

        if(dilemmaList[i].id === dilemmaId){
        currentDilemma = dilemmaList[i]; 
        }
    };

    let dilemmaText = '<div class="pure-dilemma-description">'+ currentDilemma.daName +'/'+ currentDilemma.enName +'</div><br><div class="pure-dilemma-description">'+ currentDilemma.daDescription +'</div><br><div class="pure-dilemma-description">'+ currentDilemma.enDescription +'</div>';

    return dilemmaText;
}

function userConfirmationButtonChange(){

    $('.dilemma-submit-button').hide();
    $('.dilemma-submit-button').show(2000);


}

function renderComments(dilemmaId){

    /* console.log(dilemmaId); */

    $('#feedback-info').empty();

    let commentsBox = '<div class="comments-box" id="comment-info"></div>';

    $('#feedback-info').append(commentsBox);
    
    var commentList = dilemmaIdCommentsMap.get(dilemmaId);

    for(let i = 0; i < commentList.length; i++){

    let comments = '<div class="dilemma-comments">'+ commentList[i].comments +'<form onsubmit="deleteCommentFromDilemma('+ commentList[i].id +')"><input class="delete-comment-button" type="submit" value="Slet"></form></div>';

    $('#comment-info').append(comments);    
    }

    commentList = "";
}

function renderGeneralFeedback(){

    $('#feedback-info').empty();

    
    let feedback = '<div>Denne side er under udvikling. Vi beklager.</div>'


    $('#feedback-info').append(feedback);
}