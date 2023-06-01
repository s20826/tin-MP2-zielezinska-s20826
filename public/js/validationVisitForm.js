function validateForm()
{
    //const form = document.getElementById('form')
    const vetInput = document.getElementById('vet');
    const animalInput = document.getElementById('animal');
    const visitDateInput = document.getElementById('visitDate');
    const serviceInput = document.getElementById('service');
    const priceInput = document.getElementById('price');


    const errorVetInput = document.getElementById('errorVet');
    const errorAnimalInput = document.getElementById('errorAnimal');
    const errorVisitDateInput = document.getElementById('errorVisitDate');
    const errorServiceInput = document.getElementById('errorService');
    const errorPriceInput = document.getElementById('errorPrice');

    const reqMessage = document.getElementById('error-required').innerText;
    const minMessage = document.getElementById('error-min').innerText;
    const maxMessage = document.getElementById('error-max').innerText;
    const characterMessage = document.getElementById('error-character').innerText;
   const numberMessage = document.getElementById('error-number').innerText;
    const zeroMessage = document.getElementById('error-zero').innerText;



    resetErrors([vetInput, animalInput, visitDateInput, serviceInput, priceInput],
                [errorVetInput, errorAnimalInput, errorVisitDateInput, errorServiceInput, errorPriceInput]);

    let valid = true;

    if(!checkRquired(vetInput.value)){
        valid = false;
        vetInput.classList.add("error-input");
        errorVetInput.innerText = reqMessage+"dsfd";

    }
    if(!checkRquired(animalInput.value)){
        valid = false;
        animalInput.classList.add("error-input");
        errorAnimalInput.innerText = reqMessage;

    }
        
    if(!checkRquired(serviceInput.value)){
        valid = false;
        serviceInput.classList.add("error-input");
        errorServiceInput.innerText = reqMessage;

    }else if (!checkTextLengthRange(serviceInput.value, 2, 500)){
        valid= false;
        serviceInput.classList.add("error-input");
        errorServiceInput.innerText = minMessage+" 2 "+ maxMessage+ " 500 "+characterMessage;
    }

    if(!checkRquired(priceInput.value)){
        valid = false;
        priceInput.classList.add("error-input");
        errorPriceInput.innerText = reqMessage;

    }else if (!checkNumber(priceInput.value)){
        valid= false;
        priceInput.classList.add("error-input");
        errorPriceInput.innerText = numberMessage;

    }else if (!checkNumberRange(priceInput.value, 0.01, 10_000)){
        valid= false;
        priceInput.classList.add("error-input");
        errorPriceInput.innerText = zeroMessage;
    }

/*
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' +  nowDate.getDate(),
        year = nowDate.getFullYear();

    if(month.length < 2){
        month = '0' + month;
    }
    if(day.length < 2){
        day = '0' + day;
    }
    const nowString = [year, month, day].join('.');*/

    if(!checkRquired(visitDateInput.value)){

        valid = false;
        visitDateInput.classList.add("error-input");
        errorVisitDateInput.innerText = reqMessage;

    }/*else if(!checkDate(visitDateInput.value)){
        valid = false;
        vetInput.classList.add("error-input");
        errorVetInput.innerText = "Pole powinno zawierac date w formacie ...";

    }else if(!checkDateIfAfter(visitDateInput.value, nowString)){
        valid = false;
        vetInput.classList.add("error-input");
        errorVetInput.innerText = "data nie moze byc z przyszłości";

    }else if(checkRquired(visitDateToInput.value)&& checkDate(visitDateToInput.value) 
    && !checkDateIfAfter(visitDateToInput.value, visitDateFromInput.value)
    ){
        valid = false;
        vetInput.classList.add("error-input");
        errorVetInput.innerText = "data powinna byc późniejsza niż data od";
    }
    */

    return valid;
}