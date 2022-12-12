class FormCleaner{
    cleanFormData(formData){

        let cleanFormData = {};
        formData.forEach(function(inputField){
            cleanFormData[inputField["name"]] = inputField["value"];
        });

        return cleanFormData;
    }
}

const formCleaner = new FormCleaner;