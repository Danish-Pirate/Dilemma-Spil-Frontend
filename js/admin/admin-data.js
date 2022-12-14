var dilemmaList = [];
var hintsList = [];
var packageList = [];
var packageDilemmaList = [];
var dilemmaComments = []; // may not be used
const packageDilemmaDaNameMap = new Map();
const dilemmaIdHintsListMap = new Map();
const dilemmaIdCommentsMap = new Map();
const dilemmaIdStatsMap = new Map();
var hintBody;
var dilemmaBody;
var newPackageBody;

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
        loadCommentsFromDilemma(dilemmaId);
        loadStatsFromDilemma(dilemmaId);
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

function addedNewPackage(event){

    event.preventDefault();

    newPackageBody = {
        daName:$('#addDaName').val(),
        enName:$('#addEnName').val()
    };

    api("api/post/create/cardpackage", "post", newPackageBody);

    loadPackages();
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

function addingDilemmasToPackage(event, packageId){

    event.preventDefault();
    
    for(let i = 0; i < dilemmaListToBeSpliced.length; i++){


      if($('#packageIdToAdd' + dilemmaListToBeSpliced[i].id).is(":checked") == true){

        /* console.log($('#packageIdToAdd' + dilemmaListToBeSpliced[i].id).val()); */

        api("api/post/adddilemma/"+ dilemmaListToBeSpliced[i].id + "/" + packageId +"/cardpackage", "post");
                
      }

    };

    loadPackageContent(packageId);

    renderPackageContent(packageId);
}

function removingDilemmasFromPackage(event, packageId){

    event.preventDefault();

    for(let i = 0; i < dilemmas.length; i++){

        if($('#dilemmaIdToRemove' + dilemmas[i].id).is(":checked") == true){
            
          /*  console.log(dilemmas[i].id + " " + packageId); */

            api("api/post/removedilemma/" + dilemmas[i].id + "/" + packageId + "/cardpackage", "post");
            
            
        }
                
    };
        
    loadPackageContent(packageId);

    renderPackageContent(packageId);
}

function deletePackage(packageId){    

    api("api/post/delete/"+ packageId +"/cardpackage", "post");
    
    loadPackages();
    renderPackageList();
}

function loadCommentsFromDilemma(dilemmaId){   

    var commentsList = [];

    api("api/get/findallfordilemma/"+ dilemmaId +"/commentsdilemma", "get").then( response =>{

        const comments = response;
        commentsList = [];

        for(let i = 0; i < comments.length; i++){

        commentsList.push(comments[i]);

        /* console.log(dilemmaComments[i]); */
        }     
        
        dilemmaIdCommentsMap.set(dilemmaId, commentsList);
    })       
}

function deleteCommentFromDilemma(commentId){

    console.log(commentId);

    api("api/post/delete/" + commentId + "/commentsdilemma", "post");

    loadData();
    
}

function loadStatsFromDilemma(dilemmaId){   

    var statsList = [];

    api("api/get/findall/"+ dilemmaId +"/gameanswers", "get").then( response =>{

        const stats = response;
        statsList = [];

        for(let i = 0; i < stats.length; i++){

        statsList.push(stats[i]);
        
        }     
        
        dilemmaIdStatsMap.set(dilemmaId, statsList);
    })       
}