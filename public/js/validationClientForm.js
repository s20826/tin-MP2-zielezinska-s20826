function validateForm()
{
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const phoneNumberInput = document.getElementById('phoneNumber');

    const errorFirstNameInput = document.getElementById('errorFristName');
    const errorLastNameInput = document.getElementById('errorLastName');
    const errorEmailInput = document.getElementById('errorEmail');
    const errorPhoneNumberInput = document.getElementById('errorPhoneNumber');

    const reqMessage = document.getElementById('error-required').innerText;
    const minMessage = document.getElementById('error-min').innerText;
    const maxMessage = document.getElementById('error-max').innerText;
    const phoneMessage =document.getElementById('error-phoneNumber').innerText;
    const characterMessage = document.getElementById('error-character').innerText;
    const emailMessage = document.getElementById('error-email').innerText;
    const numberMessage = document.getElementById('error-number').innerText;

    resetErrors([firstNameInput, lastNameInput, emailInput, phoneNumberInput],
                [errorFirstNameInput, errorLastNameInput, errorEmailInput, errorPhoneNumberInput]);

    let valid = true;

    if(!checkRquired(firstNameInput.value)){
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstNameInput.innerText = reqMessage+"sdds";

    }else if (!checkTextLengthRange(firstNameInput.value, 2, 30)){
        valid= false;
        firstNameInput.classList.add("error-input");
        errorFirstNameInput.innerText = minMessage+" 2 "+ maxMessage+ " 30 "+characterMessage;
    }

    if(!checkRquired(lastNameInput.value)){
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastNameInput.innerText = reqMessage;

    }else if (!checkTextLengthRange(lastNameInput.value, 2, 30)){
        valid= false;
        lastNameInput.classList.add("error-input");
        errorLastNameInput.innerText = minMessage+" 2 "+ maxMessage+ " 30 "+characterMessage;
    }

    if(!checkRquired(emailInput.value)){
        valid = false;
        emailInput.classList.add("error-input");
        errorEmailInput.innerText = reqMessage;

    }else if (!checkTextLengthRange(emailInput.value, 5, 40)){
        valid= false;
        emailInput.classList.add("error-input");
        errorEmailInput.innerText = minMessage+" 2 "+ maxMessage+ " 30 "+characterMessage;

    }else if (!checkEmail(emailInput.value)){
        valid= false;
        emailInput.classList.add("error-input");
        errorEmailInput.innerText = emailMessage;

    }

    if(!checkRquired(phoneNumberInput.value)){
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumberInput.innerText = reqMessage;

    }
    else if (!checkNumber(phoneNumberInput.value)){
        valid= false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumberInput.innerText = numberMessage;

    }else if (!checkTextLengthRange(phoneNumberInput.value, 9,9)){
        valid= false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumberInput.innerText = phoneMessage;

    }

    return valid;
}