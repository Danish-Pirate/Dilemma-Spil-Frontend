var dilemmaList = [];
var hintsList = [];
var packageList = [];
var packageDilemmaList = [];
const packageDilemmaDaNameMap = new Map();
const dilemmaIdHintsListMap = new Map();
var hintBody;
var dilemmaBody;

function loadData(){

dilemmaList = [];

api("api/get/findall/dilemma", "get").then(response=> {
        
    /* console.log(JSON.stringify(response)) */   

    const dilemmaPromise = response;

   

    for(let i = 0; i < dilemmaPromise.length; i++){

        dilemmaList.push(dilemmaPromise[i]);               

    }
    for(let i = 0; i < dilemmaList.length; i++){

        dilemmaId = dilemmaList[i].id;
    
        loadHints(dilemmaId);
    }
    /* console.log(dilemmaList[0]); */

    renderDilemmaList();

    return;
});

}

function loadPackages(){

    packageList = [];

    api("api/get/findall/cardpackage", "get",).then(response =>{

        const packagePromise = response;

        for(let i = 0; i < packagePromise.length; i++){

            packageList.push(packagePromise[i]);
        }

        

        for(let x = 0; x < packageList.length; x++){

            loadPackageContent(packageList[x].id);
                       
        }

        /* console.log(packageList.length); */

    })

}

function loadPackageContent(packageId){
    
    api("api/get/alldilemmas/"+ packageId +"/cardpackage").then(response =>{

        const promise = response;

        for(let i = 0; i < promise.length; i++){

            packageDilemmaList.push(promise[i]);

        }

        packageDilemmaDaNameMap.set(packageId, packageDilemmaList);

        /*
        for(let y = 0; y < packageDilemmaList.length; y++){    

            console.log(packageDilemmaList[y]);


        packageDilemmaDaNameMap.set(packageId, packageDilemmaList[y]);
        } */
           /* console.log(packageDilemmaList.length); */
    
           packageDilemmaList = [];
        })
        
}


function loadHints(dilemmaId){
         
       /* console.log(dilemmaId); */

    api("api/get/findall/" + dilemmaId + "/hintsdilemma", "get").then(response => {

        /* console.log(JSON.stringify(response)); */

        const hintsPromise = response;

        for(let x = 0; x < hintsPromise.length; x++){

        hintsList.push(hintsPromise[x]);
        }
      /* console.log(hintsList.length); */
        
        dilemmaIdHintsListMap.set(dilemmaId, hintsList[0]);

        /* console.log(dilemmaId); */

        hintsList = [];

        /* console.log(dilemmaIdHintsListMap.get(dilemmaId)); */

         /* console.log(dilemmaIdHintsListMap.size); */
       
    });
            
}

function editHints(event, hintId){

    /* prevents reload of the page */
    event.preventDefault();

    hintBody = {"id":hintId,
    daForHint:$('#daHintFor').val(),
    daAgainstHint:$('#daHintAgainst').val(),
    enForHint:$('#enHintFor').val(),
    enAgainstHint:$('#enHintAgainst').val()
                    };

    /* console.log(hintBody); */

    api("api/post/update/" + hintId + "/hintsdilemma", "post", hintBody);
    
    /* to update data with newest changes */
    loadData();
    userConfirmationButtonChange();
}

function editDilemma(event, dilemmaId){
    
    event.preventDefault();

    dilemmaBody = {"id":dilemmaId,
    daName:$('#daName').val(),
    enName:$('#enName').val(),
    daDescription:$('#daDescription').val(),
    enDescription:$('#enDescription').val()
                    };

    /* console.log(dilemmaBody); */

    api("api/post/update/" + dilemmaId + "/dilemma", "post", dilemmaBody);

    loadData();
    userConfirmationButtonChange();
}

function createNewDilemma(event){

    event.preventDefault();
    
    dilemmaBody = {
    daName:$('#addDaName').val(),
    enName:$('#addEnName').val(),
    daDescription:$('#addDaDescription').val(),
    enDescription:$('#addEnDescription').val()
    };

    api("api/post/create/dilemma", "post", dilemmaBody);

    loadData();
    userConfirmationButtonChange();
}
function createNewHints(event, dilemmaId){

    event.preventDefault();

    hintBody = {
            "daForHint":$('#createDaFor').val(),
            "enForHint":$('#createEnFor').val(),
            "daAgainstHint":$('#createDaAgainst').val(),
            "enAgainstHint":$('#createEnAgainst').val()
    };

    api("api/post/create/"+ dilemmaId +"/hintsdilemma", "post", hintBody);

    loadData();
    userConfirmationButtonChange();
}