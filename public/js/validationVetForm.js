function validateForm()
{
    //const form = document.getElementById('form')
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');


    const errorFirstNameInput = document.getElementById('errorFristName');
    const errorLastNameInput = document.getElementById('errorLastName');
    const errorEmailInput = document.getElementById('errorEmail');
    const errorPasswordInput = document.getElementById('errorPassword');


    const reqMessage = document.getElementById('error-required').innerText;
    const minMessage = document.getElementById('error-min').innerText;
    const maxMessage = document.getElementById('error-max').innerText;
    const characterMessage = document.getElementById('error-character').innerText;
    const emailMessage = document.getElementById('error-email').innerText;



    resetErrors([firstNameInput, lastNameInput, emailInput,passwordInput],
                [errorFirstNameInput, errorLastNameInput, errorEmailInput,errorPasswordInput ]);

    let valid = true;

    if(!checkRquired(firstNameInput.value)){
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstNameInput.innerText = reqMessage;

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

    if(!checkRquired(passwordInput.value)){
        valid = false;
        passwordInput.classList.add("error-input");
        errorPasswordInput.innerText = reqMessage;

    }else if (!checkTextLengthRange(passwordInput.value, 2, 30)){
        valid= false;
        passwordInput.classList.add("error-input");
        errorPasswordInput.innerText = minMessage+" 2 "+ maxMessage+ " 30 "+characterMessage;
    }
    return valid;
}