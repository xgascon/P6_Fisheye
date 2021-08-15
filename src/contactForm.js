// Définition des constantes

const first = document.getElementById('first');
const last = document.getElementById('last');
const email = document.getElementById('email');
const message = document.getElementById('message');
const alerteFirst = document.getElementById('alerte-first');
const alerteLast = document.getElementById('alerte-last');
const alerteEmail = document.getElementById('alerte-email');
const alerteMessage = document.getElementById('alerte-message');
var emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const verificationMessages = {
    charInputSize: "Veuillez entrer 2 caractères ou plus pour le champ !",
    inputEmail: "Veuillez renseigner une adresse email correcte !",
}
const submitBtn = document.getElementById('submitBtn');

// 
// Verification inputs on change of their data events
// 

first.addEventListener('input', function() {
    verificationCharInput(alerteFirst, first)
});

last.addEventListener('input', function() {
    verificationCharInput(alerteLast, last)
});

email.addEventListener('input', function() {
    verificationInputEmail(alerteEmail, email)
});

message.addEventListener('input', function() {
    verificationCharInput(alerteMessage, message)
}); 

// Launching error or validation layout
function alertInput(condition, alerteElement, input, message) {
    condition ? erreurInput(alerteElement, message, input) : validationInput(alerteElement, input)
}
  
// Verification for inputs requiring 2 characters 
function verificationCharInput(alerteElement, input) {
    let condition = input.value.substr(1) === '';
    // console.log(input.value)
    alertInput(condition, alerteElement, input, verificationMessages.charInputSize);
}
  
// Verification for inputs requiring an email
function verificationInputEmail(alerteElement, input) {
    let condition = !emailRegExp.test(input.value);
    alertInput(condition, alerteElement, input, verificationMessages.inputEmail);
}

// 
// Notifications form
// 

// Alert notification for wrong input
function erreurInput(alerteElement, erreur, input) {
    alerteElement.innerHTML = erreur;
    alerteElement.style.color = 'black';
    input.style.border = "2px solid black";
}

// Success notification for correct input
let validationInputMessage = "Champ correctement rempli."
function validationInput(alerteElement, input) {
    alerteElement.innerHTML = validationInputMessage;
    alerteElement.style.color = 'white';
    input.style.border = 'none';
}

// 
// Verification on submission click
// 

// Verify input elements on submission click event
submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    console.log(first.value);
    console.log(last.value);
    console.log(email.value);
    console.log(message.value);
    inputVerificationAll;
});
  
// Verify all inputs form
function inputVerificationAll(event) {
    inputVerification(event, alerteFirst, first, verificationMessages.charInputSize);
    inputVerification(event, alerteLast, last, verificationMessages.charInputSize);
    inputVerification(event, alerteEmail, email, verificationMessages.inputEmail);
    inputVerification(event, alerteMessage, message, verificationMessages.charInputSize);
}

// Verify an input form
function inputVerification(event, alerteElement, input, message){
    if(alerteElement.textContent != validationInputMessage){
        event.preventDefault();
        // alert("Veuillez compléter tous les champs.");
        erreurInput(alerteElement, message, input );
    } 
}