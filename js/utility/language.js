let language = "DA"

let textDA = undefined

let textEN = undefined

function initLanguage(){
  if(language === "DA"){
    for (const key in textDA) {
      document.querySelector(`#${key}Text`).innerHTML = textDA[key]
    
    }
   
  }else if(language === "EN"){
    for (const key in textEN) {
      document.querySelector(`#${key}Text`).innerHTML = textEN[key]
    
    }
  
  }
}

function changeLanguage(event){
if(language === "DA"){
  for (const key in textEN) {
    document.querySelector(`#${key}Text`).innerHTML = textEN[key]
  
  }
  language = "EN"
}else if(language === "EN"){
  for (const key in textDA) {
    document.querySelector(`#${key}Text`).innerHTML = textDA[key]
  
  }
  language = "DA"
}

}
fetch("json/textDA.json")
.then((content) => content.text())
.then((text) => JSON.parse(text))
.then((json) => textDA = json)
.then(()=>initLanguage())

fetch("json/textEN.json")
.then((content) => content.text())
.then((text) => JSON.parse(text))
.then((json) => textEN = json)