var dilemmaList = [];

function loadData(){

api("api/get/findall/dilemma", "get").then(response=> {
        
    /* console.log(JSON.stringify(response)) */   

    const dilemmaPromise = response;

   /* console.log(dilemmaList[0]); */

    for(let i = 0; i < dilemmaPromise.length; i++){

        dilemmaList.push(dilemmaPromise[i]);               

    }
    
    renderDilemmaList();

    return;
});

}