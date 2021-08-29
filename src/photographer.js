import "./contactForm"
import "./photographerContact"
import "./orderMedia"
import {CreateMedia} from "./createMedia"
import {sorting} from "./photographerFunctions"

// Récupération de l'identifiant du photographe d'après l'adresse URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

// Définition des constantes
const mediaContenant = document.getElementById("media-contenant");

// Définition des attributs des éléments créés
let heartAttributes = {
    "aria-label": "likes", 
    style: "color: inherit",
    class: "fa fa-heart fa-lg"
};

export {heartAttributes};

// Display all the media considering the sorting criteria
function eventHandler(sortCriteria = "popularite") {
    import('../content.json')
    .then((ns) => {
        console.log(ns);
        // Set to empty the content 
        mediaContenant.innerHTML = "" ;

        // Get the photographer in the content.json
        const photographer = ns.photographers.find(photographer => photographer.id == id); 

        // Get the photographer surname and spell it correctly to seek in images folder
        let photographerSurnameFolder;
        photographerSurnameFolder = photographer.name.split(' ')[0];
        console.log(photographerSurnameFolder)

        if(photographerSurnameFolder.split('-').length > 1) {
            let nameBitsAssembled = photographerSurnameFolder.split('-')[0];
            for (var i = 1; i <= photographerSurnameFolder.split('-').length-1; i++) {
                nameBitsAssembled += " "+photographerSurnameFolder.split('-')[i];
            }
            photographerSurnameFolder = nameBitsAssembled;
        }

        // Get all the media from the photographer and push it into an array
        var response = ns.media;
        let arrayMedia = [];
        response.forEach(media => {
            if (media.photographerId == id) {
                arrayMedia.push(media)
            }
        });

        // Sort the array 
        arrayMedia = sorting(arrayMedia, sortCriteria)

        // Display the elements of the array
        CreateMedia.build(arrayMedia, photographerSurnameFolder);
        // arrayMedia.forEach(mediaPhotographer => {            
            
        //     let mediaCard = document.createElement("div");
        //     mediaCard.className = "media-card media-card-page-display";

        //     let mediaBtn = document.createElement("button");
        //     mediaBtn.setAttribute("aria-label", "photo de "+mediaPhotographer.title);
        //     mediaBtn.className = "image-container";

        //     let bannerMedia = document.createElement("div");
        //     bannerMedia.className = "banner-media";

        //     let title = document.createElement("h3");
        //     title.innerHTML = mediaPhotographer.title;

        //     let likes = document.createElement("div");
        //     likes.className = "banner-media-likes";

        //     let numLikes = document.createElement("p");

        //     let heartBtn = createMedia("button", heartBtnAttributes);

        //     let heart2 = createMedia("i", heartAttributes);

        //     // Assemble the elements
        //     mediaContenant.appendChild(mediaCard);
        //     mediaCard.appendChild(mediaBtn);
        //     mediaCard.appendChild(bannerMedia);
        //     bannerMedia.appendChild(title);

        //     // Insert the media as the background of mediaCard
        //     insertBground(mediaPhotographer, photographerSurnameFolder, mediaBtn, mediaCard)

        //     // Generate the dialog window content at the click of the image
        //     mediaBtn.addEventListener("click", function() {
        //         let mediaIndex = (arrayMedia.findIndex(element => element == mediaPhotographer));
        //         dialog.style.display = 'flex';
        //         document.getElementById('dialog-previous').focus();

        //         defineDialogMedia(arrayMedia, photographerSurnameFolder, mediaIndex, dialogImgContainer, titleDialog);    
                
        //         // Functions to navigate through media
        //         function previousMedia() {
        //             if(mediaIndex == 0) {
        //                 mediaIndex = arrayMedia.length-1
        //             } else {
        //                 mediaIndex--;
        //             } 
        //             defineDialogMedia(arrayMedia, photographerSurnameFolder, mediaIndex, dialogImgContainer, titleDialog); 
        //         }

        //         function nextMedia() {
        //             if(mediaIndex == arrayMedia.length-1) {
        //                 mediaIndex = 0
        //             } else {
        //                 mediaIndex++;
        //             }                    
        //             defineDialogMedia(arrayMedia, photographerSurnameFolder, mediaIndex, dialogImgContainer, titleDialog); 
        //         }

        //         // Events on click on arrows and cross to close window
        //         dialogPrevious.addEventListener("click", function() {
        //             previousMedia();
        //         })

        //         dialogNext.addEventListener("click", function() {
        //             nextMedia();
        //         })

        //         dialogClose.addEventListener("click", function() {
        //             closeModal(dialog)
        //         })

        //         // Events for navigation with keyboard only
        //         document.addEventListener("keydown", function(event) {
        //             // eslint-disable-next-line default-case
        //             switch(event.key) {
        //                 case "ArrowRight":
        //                     nextMedia();
        //                     break;
        //                 case "ArrowLeft":
        //                     previousMedia();
        //                     break;
        //                 case "Escape":
        //                     closeModal(dialog);
        //                     break;
        //             }
        //         })
        //     })                        

        //     // Generate the number of likes for each media
        //     function showLikes() {
        //         numLikes.innerHTML = mediaPhotographer.likes+"&nbsp";
        //         bannerMedia.appendChild(likes);
        //         likes.appendChild(numLikes);
        //         likes.appendChild(heartBtn);
        //         heartBtn.appendChild(heart2);
        //     }
        //     showLikes()

        //     // Increment number of likes on click 
        //     heartBtn.addEventListener("click", function(){
        //         mediaPhotographer.likes += 1;
        //         showLikes()
        //         belowElements();
        //     })
        // });
    })
    .catch((error) => {
        console.log("erreur survenue", error);
    })
}

export {eventHandler};

// Call the function
eventHandler();
