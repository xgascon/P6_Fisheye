import {eventHandler} from "./photographer"

// Définition des constantes
const orderByTrigger = document.getElementById('order-by-trigger');
const orderByTriggerText = document.getElementById('order-by-trigger-text');
const orderByDropdown = document.getElementById('order-by-dropdown');
const orderByDropdownElement = document.querySelectorAll('.order-by-dropdown-element');

// Display the dropdown list 
orderByTrigger.addEventListener("click", function () {
    orderByTrigger.style.display = 'none';
    orderByDropdown.style.display = 'block';
});

// Display the media and close the drop down list once clicked on a sorting value
orderByDropdownElement.forEach((btn) => {
    btn.addEventListener("click", function () {
        eventHandler(btn.value)
        orderByTriggerText.innerText = btn.innerText;
        orderByDropdown.style.display = 'none';
        orderByTrigger.style.display = 'block';
    })    
});