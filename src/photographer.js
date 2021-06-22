// Récupération de l'identifiant du photographe d'après l'adresse URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const sectionProfile = document.querySelector(".photographer-section-contact");
const mediaContenant = document.getElementById("media-contenant");
const modalHeader = document.getElementById("modal-header");
const photographerBelowElements = document.querySelector(".photographer-belowElements");
const modalInitial = document.getElementById("modal-initial");
const modalClose = document.getElementById("modal-header-close");
const dialog = document.getElementById('dialog');
const dialogImgContainer = document.getElementById('dialog-img-container');
const dialogClose = document.getElementById('dialog-close');
const titleDialog = document.getElementById('title-dialog');
const dialogPrevious = document.getElementById('dialog-previous');
const dialogNext = document.getElementById('dialog-next');
const orderByTrigger = document.getElementById('order-by-trigger');
const orderByTriggerText = document.getElementById('order-by-trigger-text');
const orderByDropdown = document.getElementById('order-by-dropdown');
const orderByDropdownElement = document.querySelectorAll('.order-by-dropdown-element');
const first = document.getElementById('first');
const last = document.getElementById('last');
const email = document.getElementById('email');
const message = document.getElementById('message');
const alerteFirst = document.getElementById('alerte-first');
const alerteLast = document.getElementById('alerte-last');
const alerteEmail = document.getElementById('alerte-email');
const alerteMessage = document.getElementById('alerte-message');
const verificationMessages = {
    charInputSize: "Veuillez entrer 2 caractères ou plus pour le champ !",
    inputEmail: "Veuillez renseigner une adresse email correcte !",
}
const submitBtn = document.getElementById('submitBtn');
let heartAttributes = {
    "aria-label": "likes", 
    class: "fa fa-heart"
};

// 
// Modals launching and closing
// 

// launch modals
function launchModal(modal) {
    modal.style.display = "block";
}

// close modals
function closeModal(modal) {
    modal.style.display = "none";
}

modalClose.addEventListener("click", function() {
    closeModal(modalInitial);
})

dialogClose.addEventListener("click", function() {
    // dialog.close();
    dialog.style.display = 'none';
})

// 
// Code for form verifications
// 

// RegEx to verify email input 
var emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    console.log(input.value)
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
submitBtn.addEventListener('click', inputVerificationAll);
  
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

// 
// Code for layout display
// 

// Gérer la fonction pour que criteria s'adapte en fonction du sortCriteria
function sorting(table, sortCriteria) {
    let x = sortCriteria == "titre" ? 1 : -1;
    let y = sortCriteria == "titre" ? -1 : 1;
    let criteria = "likes";
    if(sortCriteria == "date") {
        criteria = "date";
    } else if(sortCriteria == "titre") {
        criteria = "title";
    }
    return table.sort((a, b) => (a[criteria] > b[criteria]) ? x : y);
}

function eventHandler(sortCriteria = "popularite") {
    import('../content.json')
    .then((ns) => {
        console.log(ns);
        mediaContenant.innerHTML = "" ;

        sectionProfile.innerHTML = "" ;

        const photographer = ns.photographers.find(photographer => photographer.id == id);

        modalHeader.innerHTML = "Contactez-moi<br>"+photographer.name;

        let portraitContainer = document.createElement("div");
        portraitContainer.className = "portrait-container";
        let backgroundPortrait = "./images/Photographers%20ID%20Photos/"+photographer.portrait;
        portraitContainer.setAttribute("style", `background-image: url(${backgroundPortrait.replace(" ","%20")})`);
        portraitContainer.setAttribute("aria-label", photographer.name);

        let contactButtonAttributes = {
            class: "contact-button"
        };

        let contactButton = createMedia("button", contactButtonAttributes);
        contactButton.innerHTML = "Contactez-moi";
        contactButton.setAttribute("aria-label", "Contactez-moi");
        contactButton.addEventListener("click", function () {
            launchModal(modalInitial)
            modalInitial.setAttribute("aria-labelledby", "modal-header")
        });

        let contactDiv = document.createElement("div");
        contactDiv.className = "contact-div";

        let contactButtonDiv = document.createElement("div");
        contactButtonDiv.className = "contact-div-button";

        let contactText = document.createElement("div");
        contactText.className = "contact-text";

        let contactHeaderAttributes = {
            class: "artist-name artist-name-contact"
        }

        let contactHeader = createMedia("h1", contactHeaderAttributes);
        contactHeader.innerHTML = photographer.name;

        let contactParagraph = document.createElement("p");

        let contactLocationAttributes = {
            class: "artist-location"
        }

        let contactLocation = createMedia("span", contactLocationAttributes);
        contactLocation.innerHTML = photographer.city+", "+photographer.country;

        let contactTaglineAttributes = {
            class: "artist-tagline"
        }

        let contactTagline = createMedia("span", contactTaglineAttributes);
        contactTagline.innerHTML = "<br>"+photographer.tagline;

        let contactTagsAttributes = {
            class: "main-navbar-list artist-tags"
        }

        let contactTags = createMedia("ul", contactTagsAttributes);
        photographer.tags.forEach(tag => {
            let tagName = tag;
            if(tag === "sports") {
              tagName = "sport";
            }
            let artistTagsList = document.createElement("li");

            let tagLink = document.createElement("a");
            tagLink.setAttribute("href", "tags.html?tag="+tagName);
            tagLink.setAttribute("aria-label", tagName);
            tagLink.innerHTML = "#"+tagName;

            contactTags.appendChild(artistTagsList); 
            artistTagsList.appendChild(tagLink);
        });

        sectionProfile.appendChild(portraitContainer);
        sectionProfile.appendChild(contactDiv);

        contactDiv.appendChild(contactButtonDiv);
        contactDiv.appendChild(contactText);
        contactButtonDiv.appendChild(contactButton);
        contactText.appendChild(contactHeader);
        contactText.appendChild(contactParagraph);
        contactParagraph.appendChild(contactLocation);
        contactParagraph.appendChild(contactTagline);
        contactText.appendChild(contactTags);

        // Section Medias
        let photographerSurname;
        photographerSurname = photographer.name.split(' ')[0];

        if(photographerSurname.split('-').length > 1) {
            let nameBitsAssembled = photographerSurname.split('-')[0];
            for (var i = 1; i <= photographerSurname.split('-').length-1; i++) {
                nameBitsAssembled += " "+photographerSurname.split('-')[i];
            }
            photographerSurname = nameBitsAssembled;
        }

        var response = ns.media;
        let arrayMedia = [];
        response.forEach(media => {
            if (media.photographerId == id) {
                arrayMedia.push(media)
            }
        });

        arrayMedia = sorting(arrayMedia, sortCriteria)

        arrayMedia.forEach(mediaPhotographer => {            
            
            let mediaCard = document.createElement("div");
            mediaCard.className = "media-card media-card-page-display";

            let mediaDiv = document.createElement("div");
            mediaDiv.setAttribute("aria-label", mediaPhotographer.title);
            mediaDiv.className = "image-container";

            mediaDiv.addEventListener("click", function() {
                let mediaIndex = (arrayMedia.findIndex(element => element == mediaPhotographer))
                dialog.style.display = 'flex';
                // dialog.showModal();

                defineDialogMedia()

                function defineDialogMedia() {
                    if (arrayMedia[mediaIndex].image) {
                        if (dialogImgContainer.firstElementChild) {
                            dialogImgContainer.removeChild(dialogImgContainer.firstElementChild);
                        }
                        let backgroundDialog = "./images/"+photographerSurname+"/"+arrayMedia[mediaIndex].image;
                        dialogImgContainer.setAttribute("style", `background-image: url(${backgroundDialog.replace(" ", "%20")});`);
                        dialogImgContainer.setAttribute("aria-label", arrayMedia[mediaIndex].title);
                    } else if (arrayMedia[mediaIndex].video) {
                        let videoSourceAttributes = {
                            "src": "./images/"+photographerSurname+"/"+arrayMedia[mediaIndex].video, 
                            "type": "video/mp4",
                        };
        
                        let videoSource = createMedia("source", videoSourceAttributes);
        
                        let videoAttributes = {
                            "preload": "auto", 
                            "controls": true,
                            class: "photographer-image"
                        };
                        let video = createMedia("video", videoAttributes);
                        video.setAttribute("style", `background: black;`);
                        video.appendChild(videoSource);

                        dialogImgContainer.setAttribute("aria-label", arrayMedia[mediaIndex].title);
                        dialogImgContainer.appendChild(video);
                        
                    }
                    titleDialog.innerHTML = arrayMedia[mediaIndex].title;
                }            

                dialogPrevious.addEventListener("click", function() {
                    if(mediaIndex == 0) {
                        mediaIndex = arrayMedia.length-1
                    } else {
                        mediaIndex--;
                    } 
                    defineDialogMedia();
                })

                dialogNext.addEventListener("click", function() {
                    if(mediaIndex == arrayMedia.length-1) {
                        mediaIndex = 0
                    } else {
                        mediaIndex++;
                    }                    
                    defineDialogMedia();
                })

            })            

            mediaContenant.appendChild(mediaCard);

            let width = mediaCard.clientWidth;
            let height = width;

            if (mediaPhotographer.image) {

                let background = "./images/"+photographerSurname+"/"+mediaPhotographer.image;
                mediaDiv.setAttribute("style", `background-image: url(${background.replace(" ","%20")}); width: ${width}px; height: ${height}px`);
                window.addEventListener("resize", function () {
                    width = mediaCard.clientWidth;
                    height = width;
                    mediaDiv.setAttribute("style", `background-image: url(${background.replace(" ","%20")}); width: ${width}px; height: ${height}px`)                  
                });
            } else if (mediaPhotographer.video) {

                let videoSourceAttributes = {
                    "src": "./images/"+photographerSurname+"/"+mediaPhotographer.video, 
                    "type": "video/mp4",
                };

                let videoSource = createMedia("source", videoSourceAttributes);

                let videoAttributes = {
                    "preload": "auto", 
                    "controls": true,
                    class: "photographer-image"
                };

                window.addEventListener("resize", function () {
                    width = mediaCard.clientWidth;
                    height = width;
                    video.setAttribute("style", `background: black; width: ${width}px; height: ${height}px`)                  
                });

                let video = createMedia("video", videoAttributes);

                video.appendChild(videoSource);

                mediaDiv.appendChild(video);
                video.setAttribute("style", `background: black ; width: ${width}px; height: ${height}px`);
            }
            let bannerMedia = document.createElement("div");
            bannerMedia.className = "banner-media";

            let title = document.createElement("h3");
            title.innerHTML = mediaPhotographer.title;

            let likes = document.createElement("div");
            likes.innerHTML = mediaPhotographer.likes+" ";

            let heart2 = createMedia("i", heartAttributes);

            mediaCard.appendChild(mediaDiv);
            mediaCard.appendChild(bannerMedia);
            bannerMedia.appendChild(title);
            bannerMedia.appendChild(likes);
            likes.appendChild(heart2);

        });
    })
    .catch((error) => {
        console.log("erreur survenue", error);
    })
}

function belowElements () {
    import('../content.json')
    .then((ns) => {        
        const photographer = ns.photographers.find(photographer => photographer.id == id);
        console.log(photographer);
        let heart1 = createMedia("i", heartAttributes);
        let photographerLikes = document.createElement("div"); 
        let photographerLikesNumber = 0;
        var response = ns.media;
        let arrayMedia = [];
        response.forEach(media => {
            if (media.photographerId == id) {
                arrayMedia.push(media)
            }
        });
      
        arrayMedia.forEach(mediaPhotographer => {
            photographerLikesNumber += mediaPhotographer.likes;
        })
        console.log(arrayMedia)
        photographerLikes.innerHTML = photographerLikesNumber+" ";

        let photographerPrice = document.createElement("div");
        photographerPrice.innerHTML = photographer.price+"€ / jour";

        photographerBelowElements.appendChild(photographerLikes);
        photographerLikes.appendChild(heart1);
        photographerBelowElements.appendChild(photographerPrice);
    })
    .catch((error) => {
        console.log("erreur survenue dans belowElements"+error);
    })
}

eventHandler();
belowElements();

orderByTrigger.addEventListener("click", function () {
    orderByTrigger.style.display = 'none';
    orderByDropdown.style.display = 'block';
});

orderByDropdownElement.forEach((btn) => {
    btn.addEventListener("click", function () {
        eventHandler(btn.value)
        orderByTriggerText.innerText = btn.innerText;
        orderByDropdown.style.display = 'none';
        orderByTrigger.style.display = 'block';
    })    
});

function createMedia (tagName, attributes) {
    let tag = document.createElement(tagName);
    for (const attribute in attributes) {
        tag.setAttribute(attribute, attributes[attribute])
    }
    return tag;
}