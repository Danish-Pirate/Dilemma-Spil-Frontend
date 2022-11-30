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
    
}

function renderPackages() {
    var x = document.getElementById("package-page");
    
    resetPage();
    
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    
}

function renderStatistics() {
    var x = document.getElementById("statistics-page");
    
    resetPage();
    
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    
}

function renderFeedback() {
    var x = document.getElementById("feedback-page");
    
    resetPage();
    
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }   
}


function renderDilemmaList(){
    
    $('#dilemma-info').empty();

    $('#dilemma-info').css("column-count", 3);

    for(let i = 0; i < dilemmaList.length; i++){

    let dilemmaNameLink = '<button class="dilemma-name-buttons" onclick="renderEditDilemmaForm('+ dilemmaList[i].id +')">'+ dilemmaList[i].daName + '</button>'

    $('#dilemma-info').append(dilemmaNameLink);

    }
}



function renderAddDilemma(){

}

function renderEditDilemmaForm(id){
    
    let currentDilemma;

    for(let i = 0; i < dilemmaList.length; i++){

        if(dilemmaList[i].id === id){
        currentDilemma = dilemmaList[i]; 
        }
    }


    $('#dilemma-info').empty();

    let dilemmaForm = '<div><form><label for="daName">Dansk navn</label> <input type="text" id="daName" value="' + currentDilemma.daName + '"><label for="enName">Engelsk navn</label> <input type="text" id="enName" value="'
     + currentDilemma.enName +'"><label for="daDescription">Dansk dilemma tekst</label><input type="text" id="daDescription" value="' + currentDilemma.daDescription +
      '"> <label for="enDescription">Engelsk dilemma tekst</label><input type="text" id="enDescription" value="' + currentDilemma.enDescription + '"> <input type="submit"></form></div>'

     


    $('#dilemma-info').append(dilemmaForm);
}
