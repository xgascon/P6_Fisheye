// Récupération de l'identifiant du photographe d'après l'adresse URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const sectionProfile = document.querySelector(".photographer-section-contact");
const sectionMedia = document.querySelector(".section-media");
const mediaContenant = document.getElementById("media-contenant");
const modalHeader = document.getElementById("modal-header");
const photographerBelowElements = document.querySelector(".photographer-belowElements");
const modalInitial = document.getElementById("modal-initial");
const modalClose = document.getElementById("modal-header-close");
const dialog = document.getElementById('dialog');
const dialogImgContainer = document.getElementById('dialog-img-container');
const dialogBannerMedia = document.getElementById('dialog-banner-media');
const dialogClose = document.getElementById('dialog-close');
const titleDialog = document.getElementById('title-dialog');
const dialogPrevious = document.getElementById('dialog-previous');
const dialogNext = document.getElementById('dialog-next');
// let mediaContenanttest ;

const orderBy = document.querySelector(".order-by");

// function sorting(table, criteria) {
//     table.sort((a, b) => (a.criteria > b.criteria) ? -1 : 1);
// };

// 
// Modals launching and closing
// 

// launch modals
function launchModal(modal) {
    modal.style.display = "block";
}

// close modal initial event
// closeModalInitial.addEventListener("click", function() {
//     closeModal(modalInitial)
// });

// close modal success event
// closeModalSuccess.addEventListener("click", function() {
//     closeModal(modalSuccess)
// });

// close modals
function closeModal(modal) {
    modal.style.display = "none";
}

modalClose.addEventListener("click", function() {
    closeModal(modalInitial);
})

dialogClose.addEventListener("click", function() {
    dialog.close();
})

// Launch modal success and close modal initial event
// form.addEventListener('submit', function(event) {
//     event.preventDefault();
//     closeModal(modalInitial);
//     launchModal(modalSuccess);
// });

function eventHandler(sortCriteria = "popularite") {
    import('../content.json')
    .then((ns) => {
        console.log(ns);
        mediaContenant.innerHTML = "" ;

        sectionProfile.innerHTML = "" ;

        const photographer = ns.photographers.find(photographer => photographer.id == id);

        modalHeader.innerHTML = "Contactez-moi<br>"+photographer.name;

        // Section Photographer
        // let portraitAttributes = {
        //     "src": "./images/Photographers ID Photos/"+photographer.portrait, 
        //     class: "portrait-img"
        // };

        // let portrait = createMedia("img", portraitAttributes);

        let portraitContainer = document.createElement("div");
        portraitContainer.className = "portrait-container";
        let backgroundPortrait = "./images/Photographers%20ID%20Photos/"+photographer.portrait;
        portraitContainer.setAttribute("style", `background-image: url(${backgroundPortrait.replace(" ","%20")})`);

        let contactButtonAttributes = {
            class: "contact-button"
        };

        let contactButton = createMedia("button", contactButtonAttributes);
        contactButton.innerHTML = "Contactez-moi";
        contactButton.addEventListener("click", function () {
            launchModal(modalInitial)
        });

        let contactDiv = document.createElement("div");
        contactDiv.className = "contact-div";

        let contactButtonDiv = document.createElement("div");

        let contactText = document.createElement("div");
        contactText.className = "contact-text";

        let contactHeaderAttributes = {
            class: "artist-name"
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
            let artistTagsList = document.createElement("li");

            let tagLink = document.createElement("a");
            tagLink.setAttribute("href", "tags.html?tag="+tag);
            tagLink.innerHTML = "#"+tag;

            contactTags.appendChild(artistTagsList); 
            artistTagsList.appendChild(tagLink);
        });

        let heartAttributes = {
            "aria-label": "likes", 
            class: "fa fa-heart"
        };
        
        let heart1 = createMedia("i", heartAttributes);

        let photographerLikes = document.createElement("div"); 

        let photographerLikesNumber = 0;

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
            for (i = 1; i <= photographerSurname.split('-').length-1; i++) {
                nameBits = " "+photographerSurname.split('-')[i];
                nameBitsAssembled += nameBits;
            }
            photographerSurname = nameBitsAssembled;
        }

        var response = ns.media;
        console.log(response);
        let arrayMedia = [];
        response.forEach(media => {
            if (media.photographerId == id) {
                // arrayMedia.push(media.image || media.video);
                arrayMedia.push(media)
            }
        });

        if (sortCriteria == "popularite") {
            arrayMedia.sort((a, b) => (a.likes > b.likes) ? -1 : 1);
            console.log(sortCriteria);
        } else if (sortCriteria == "date") {
            arrayMedia.sort((a, b) => (a.date > b.date) ? -1 : 1);
            console.log(sortCriteria);
        } else if (sortCriteria == "titre") {
            arrayMedia.sort((a, b) => (a.title > b.title) ? 1 : -1);
            console.log(sortCriteria);
        }

        console.log(arrayMedia);
        arrayMedia.forEach(mediaPhotographer => {            
            
            let mediaCard = document.createElement("div");
            mediaCard.className = "media-card";

            // let mediaDivLinkAttributes = {
            //     "href": "./images/"+photographerSurname+"/"+mediaPhotographer.image, 
            //     class: "card-artists-link"
            // };
    
            // let mediaDivLink = createMedia("a", mediaDivLinkAttributes);

            let mediaDiv = document.createElement("div");
            mediaDiv.className = "image-container";

            mediaDiv.addEventListener("click", function() {
                let mediaIndex = (arrayMedia.findIndex(element => element == mediaPhotographer))
                dialog.showModal();

                defineDialogImg()

                function defineDialogImg() {
                    let backgroundDialog = "./images/"+photographerSurname+"/"+arrayMedia[mediaIndex].image;
                    dialogImgContainer.setAttribute("style", `background-image: url(${backgroundDialog.replace(" ", "%20")}); width: 25em; height: 25em`);
                    titleDialog.innerHTML = arrayMedia[mediaIndex].title;
                }            

                dialogPrevious.addEventListener("click", function() {
                    if(mediaIndex == 0) {
                        mediaIndex = arrayMedia.length-1
                    } else {
                        mediaIndex--;
                    } 
                    defineDialogImg();
                })

                dialogNext.addEventListener("click", function() {
                    if(mediaIndex == arrayMedia.length-1) {
                        mediaIndex = 0
                    } else {
                        mediaIndex++;
                    }                    
                    defineDialogImg();
                })

            })            
            
            photographerLikesNumber += mediaPhotographer.likes;

            mediaContenant.appendChild(mediaCard);
            if (mediaPhotographer.image) {

                // let imgAttributes = {
                //     "src": "./images/"+photographerSurname+"/"+mediaPhotographer.image, 
                //     class: "photographer-image"
                // };

                // let photo = createMedia("img", imgAttributes);

                let background = "./images/"+photographerSurname+"/"+mediaPhotographer.image;
                
                mediaDiv.setAttribute("style", `background-image: url(${background.replace(" ","%20")})`);
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

                let video = createMedia("video", videoAttributes);

                video.appendChild(videoSource);

                mediaDiv.appendChild(video);
            }
            let bannerMedia = document.createElement("div");
            bannerMedia.className = "banner-media";

            let title = document.createElement("h3");
            title.innerHTML = mediaPhotographer.title;

            let likes = document.createElement("div");
            likes.innerHTML = mediaPhotographer.likes+" ";

            let heart2 = createMedia("i", heartAttributes);

            mediaCard.appendChild(mediaDiv);
            // mediaDivLink.appendChild(mediaDiv);
            mediaCard.appendChild(bannerMedia);
            bannerMedia.appendChild(title);
            bannerMedia.appendChild(likes);
            likes.appendChild(heart2);

            for (let i = 0; i < document.getElementsByClassName("image-container").length; i++) {
                const element = document.getElementsByClassName("image-container")[i];
                let width = document.querySelector(".media-card").clientWidth;
                let height = width; 
                let style = element.getAttribute("style");            
                element.setAttribute("style", `${style}; width: ${width}px; height: ${height}px`);  
            }
        });
        photographerLikes.innerHTML = photographerLikesNumber+" ";

        let photographerPrice = document.createElement("div");
        photographerPrice.innerHTML = photographer.price+"€ / jour";

        photographerBelowElements.appendChild(photographerLikes);
        photographerLikes.appendChild(heart1);
        photographerBelowElements.appendChild(photographerPrice);
    })
    .catch((error) => {
        console.log("erreur survenue");
    })
}

eventHandler();

orderBy.addEventListener("change", function (event) {
    eventHandler(event.target.value);
});

function createMedia (tagName, attributes) {
    let tag = document.createElement(tagName);
    for (const attribute in attributes) {
        tag.setAttribute(attribute, attributes[attribute])
    };
    return tag;
}