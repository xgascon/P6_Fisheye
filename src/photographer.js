import "./contactForm"

// Récupération de l'identifiant du photographe d'après l'adresse URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

// Définition des constantes
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

// Définition des attributs des éléments créés
let heartAttributes = {
    "aria-label": "likes", 
    style: "color: inherit",
    class: "fa fa-heart fa-lg"
};
let heartBtnAttributes = {
    style: "cursor: pointer; color: inherit; border: none; background: none;"
}
let contactButtonAttributes = {
    class: "contact-button"
};
let contactHeaderAttributes = {
    class: "artist-name artist-name-contact"
}
let contactLocationAttributes = {
    class: "artist-location"
}
let contactTaglineAttributes = {
    class: "artist-tagline"
}
let contactTagsAttributes = {
    class: "main-navbar-list artist-tags"
}

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
    closeModal(dialog)
})

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
        portraitContainer.setAttribute("aria-label", "portrait de "+photographer.name);

        let contactButton = createMedia("button", contactButtonAttributes);
        contactButton.innerHTML = "Contactez-moi";
        contactButton.setAttribute("aria-label", "Contactez-moi");
        contactButton.addEventListener("click", function () {
            launchModal(modalInitial)
            modalInitial.setAttribute("aria-labelledby", "modal-header")
            document.getElementById('first').focus();
        });

        let contactDiv = document.createElement("div");
        contactDiv.className = "contact-div";

        let contactButtonDiv = document.createElement("div");
        contactButtonDiv.className = "contact-div-button";

        let contactText = document.createElement("div");
        contactText.className = "contact-text";

        let contactHeader = createMedia("h1", contactHeaderAttributes);
        contactHeader.innerHTML = photographer.name;

        let contactParagraph = document.createElement("p");        

        let contactLocation = createMedia("span", contactLocationAttributes);
        contactLocation.innerHTML = photographer.city+", "+photographer.country;

        let contactTagline = createMedia("span", contactTaglineAttributes);
        contactTagline.innerHTML = "<br>"+photographer.tagline;

        let contactTags = createMedia("ul", contactTagsAttributes);
        photographer.tags.forEach(tag => {
            let tagName = tag;
            if(tag === "sports") {
              tagName = "sport";
            }
            let artistTagsList = document.createElement("li");

            let tagLink = document.createElement("a");
            tagLink.setAttribute("href", "index.html?tag="+tagName);

            let spanLink = document.createElement("span");
            spanLink.setAttribute("aria-label", tagName);
            spanLink.innerHTML = "#"+tagName;

            contactTags.appendChild(artistTagsList); 
            artistTagsList.appendChild(tagLink);
            tagLink.appendChild(spanLink);
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

            let mediaBtn = document.createElement("button");
            mediaBtn.setAttribute("aria-label", "photo de "+mediaPhotographer.title);
            mediaBtn.className = "image-container";

            mediaBtn.addEventListener("click", function() {
                let mediaIndex = (arrayMedia.findIndex(element => element == mediaPhotographer))
                dialog.style.display = 'flex';
                document.getElementById('dialog-previous').focus();
                // dialog.showModal();

                defineDialogMedia()

                function defineDialogMedia() {
                    if (arrayMedia[mediaIndex].image) {
                        if (dialogImgContainer.firstElementChild) {
                            dialogImgContainer.removeChild(dialogImgContainer.firstElementChild);
                        }
                        let backgroundDialog = "./images/"+photographerSurname+"/"+arrayMedia[mediaIndex].image;
                        dialogImgContainer.setAttribute("style", `background-image: url(${backgroundDialog.replace(" ", "%20")});`);
                        dialogImgContainer.setAttribute("aria-label", "photo de "+arrayMedia[mediaIndex].title);
                    } else if (arrayMedia[mediaIndex].video) {
                        dialogImgContainer.setAttribute("style", `background-image: none`);
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
                
                function previousMedia () {
                    if(mediaIndex == 0) {
                        mediaIndex = arrayMedia.length-1
                    } else {
                        mediaIndex--;
                    } 
                    defineDialogMedia();
                }

                function nextMedia () {
                    if(mediaIndex == arrayMedia.length-1) {
                        mediaIndex = 0
                    } else {
                        mediaIndex++;
                    }                    
                    defineDialogMedia();
                }

                document.addEventListener("keydown", function(event) {
                    // eslint-disable-next-line default-case
                    switch(event.key) {
                        case "ArrowRight":
                            nextMedia();
                            break;
                        case "ArrowLeft":
                            previousMedia();
                            break;
                        case "Escape":
                            closeModal(dialog);
                            break;
                    }
                })

                dialogPrevious.addEventListener("click", function() {
                    previousMedia();
                })

                dialogNext.addEventListener("click", function() {
                    nextMedia();
                })

            })            

            mediaContenant.appendChild(mediaCard);

            let width = mediaCard.clientWidth;
            let height = width;

            if (mediaPhotographer.image) {

                let background = "./images/"+photographerSurname+"/"+mediaPhotographer.image;
                mediaBtn.setAttribute("style", `background-image: url(${background.replace(" ","%20")}); width: ${width}px; height: ${height}px`);
                window.addEventListener("resize", function () {
                    width = mediaCard.clientWidth;
                    height = width;
                    mediaBtn.setAttribute("style", `background-image: url(${background.replace(" ","%20")}); width: ${width}px; height: ${height}px`)                  
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

                mediaBtn.appendChild(video);
                video.setAttribute("style", `background: black ; width: ${width}px; height: ${height}px`);
            }
            let bannerMedia = document.createElement("div");
            bannerMedia.className = "banner-media";

            let title = document.createElement("h3");
            title.innerHTML = mediaPhotographer.title;

            let likes = document.createElement("div");
            likes.className = "banner-media-likes";

            let numLikes = document.createElement("p");

            let heartBtn = createMedia("button", heartBtnAttributes);

            let heart2 = createMedia("i", heartAttributes);

            mediaCard.appendChild(mediaBtn);
            mediaCard.appendChild(bannerMedia);
            bannerMedia.appendChild(title);

            function showLikes () {
                // likes.innerHTML = mediaPhotographer.likes+"&nbsp";
                numLikes.innerHTML = mediaPhotographer.likes+"&nbsp";
                bannerMedia.appendChild(likes);
                likes.appendChild(numLikes);
                likes.appendChild(heartBtn);
                heartBtn.appendChild(heart2);
            }
            showLikes()

            heartBtn.addEventListener("click", function(){
                mediaPhotographer.likes += 1;
                showLikes()
                belowElements();
            })

        });
    })
    .catch((error) => {
        console.log("erreur survenue", error);
    })
}

// Create elements 
function belowElements () {
    import('../content.json')
    .then((ns) => {        
        photographerBelowElements.innerHTML = "";
        const photographer = ns.photographers.find(photographer => photographer.id == id);
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