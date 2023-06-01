function validateForm()
{
    const nameInput = document.getElementById('name');
    const speciesInput = document.getElementById('species');
    const breedInput = document.getElementById('breed');
    const weightInput = document.getElementById('weight');
    const birthDateInput = document.getElementById('birthDate');
    const ownerInput = document.getElementById('owner');

    const errorNameInput = document.getElementById('errorName');
    const errorSpeciesInput = document.getElementById('errorSpecies');
    const errorBreedInput = document.getElementById('errorBreed');
    const errorWeightInput = document.getElementById('errorWeight');
    const errorBirthDateInput = document.getElementById('errorBirthDate');
    const errorOwnerInput = document.getElementById('errorOwner');

    const reqMessage = document.getElementById('error-required').innerText;
    const minMessage = document.getElementById('error-min').innerText;
    const maxMessage = document.getElementById('error-max').innerText;
    const characterMessage = document.getElementById('error-character').innerText;
    const numberMaxMinMessage = document.getElementById('error-numberMinMax').innerText;
    const numberMessage = document.getElementById('error-number').innerText;
    const dateMessage = document.getElementById('error-date').innerText;


    resetErrors([nameInput, speciesInput, breedInput, weightInput,birthDateInput, ownerInput],
                [errorNameInput, errorSpeciesInput, errorBreedInput, errorWeightInput, errorBirthDateInput,errorOwnerInput]);

    let valid = true;

    if(!checkRquired(nameInput.value)){
        valid = false;
        nameInput.classList.add("error-input");
        errorNameInput.innerText = reqMessage;

    }else if (!checkTextLengthRange(nameInput.value, 2, 30)){
       nameInput.classList.add("error-input");
        errorNameInput.innerText = minMessage+" 2 "+ maxMessage+ " 30 "+characterMessage;
    }

    if(!checkRquired(speciesInput.value)){
        valid = false;
        speciesInput.classList.add("error-input");
        errorSpeciesInput.innerText = reqMessage;

    }else if (!checkTextLengthRange(speciesInput.value, 2, 30)){
        valid= false;
        speciesInput.classList.add("error-input");
        errorSpeciesInput.innerText = minMessage+" 2 "+ maxMessage+ " 30 "+characterMessage;
    }

    if(!checkRquired(breedInput.value)){
        valid = false;
        breedInput.classList.add("error-input");
        errorBreedInput.innerText = reqMessage;

    }else if (!checkTextLengthRange(breedInput.value, 2, 50)){
        valid= false;
        breedInput.classList.add("error-input");
        errorBreedInput.innerText = minMessage+" 2 "+ maxMessage+ " 50 "+characterMessage;
    }
    
    if(!checkRquired(weightInput.value)){
        valid = false;
        weightInput.classList.add("error-input");
        errorWeightInput.innerText = reqMessage;

    }else if (!checkNumber(weightInput.value)){
        valid= false;
        weightInput.classList.add("error-input");
        errorWeightInput.innerText = numberMessage;

    }else if (!checkNumberRange(weightInput.value, 0.1, 10_000)){
        valid= false;
        weightInput.classList.add("error-input");
        errorWeightInput.innerText = numberMaxMinMessage;
    }

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
    const nowString = [year, month, day].join('-')



    if(!checkDateIfAfter(birthDateInput.value , nowString)){

        valid = false;
        birthDateInput.classList.add("error-input");
        errorBirthDateInput.innerText = dateMessage;

    }

    if(!checkRquired(ownerInput.value)){
        valid = false;
        ownerInput.classList.add("error-input");
        errorOwnerInput.innerText = reqMessage;

    }
    return valid;
}