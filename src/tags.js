// Récupération de l'identifiant du photographe d'après l'adresse URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const tag = urlParams.get('tag');

const mediaContenant = document.getElementById("media-contenant") ;
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

dialogClose.addEventListener("click", function() {
    dialog.close();
    dialog.style.display = 'none';
})

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
        console.log(ns.media);
        mediaContenant.innerHTML = "" ;

        let mediaTag = ns.media.reduce(function(accumulator, element){
            let elementTags = element.tags;
            if(elementTags.includes("portait")){
                elementTags.splice(0, 0, "portrait");
            }
            if (elementTags.includes(tag)) {
                let photographer = ns.photographers.find(photographer => photographer.id == element.photographerId);
                let photographerSurname = photographer.name.split(' ')[0];
                photographerSurname = photographerSurname.replaceAll("-", " ");
                let mediaPath = "./images/"+photographerSurname+"/"+(element.image || element.video);
                element.mediaPath = mediaPath; 
                element.photographer = photographer;
                accumulator.push(element);
                return accumulator;
            }
            return accumulator;
        },[]) 

        mediaTag = sorting(mediaTag, sortCriteria)

        console.log("mediaTag avec sorting")
        console.log(mediaTag)

        mediaTag.forEach(elt => {
            let mediaCard = document.createElement("div");
            mediaCard.className = "media-card media-card-page-display";

            mediaContenant.appendChild(mediaCard);

            let mediaLink = document.createElement("a");
            mediaLink.setAttribute("href", "#dialog");

            let mediaDiv = document.createElement("div");
            mediaDiv.setAttribute("aria-label", elt.title);
            mediaDiv.className = "image-container";

            mediaLink.appendChild(mediaDiv);

            mediaLink.addEventListener("click", function() {
                let mediaIndex = (mediaTag.findIndex(element => element == elt))
                dialog.style.display = 'flex';
                dialog.showModal();

                defineDialogMedia()

                function defineDialogMedia() {
                    if (mediaTag[mediaIndex].image) {
                        if (dialogImgContainer.firstElementChild) {
                            dialogImgContainer.removeChild(dialogImgContainer.firstElementChild);
                        }
                        let backgroundDialog = mediaTag[mediaIndex].mediaPath;
                        dialogImgContainer.setAttribute("style", `background-image: url(${backgroundDialog.replace(" ", "%20")}); width: 25em; height: 25em`);
                        dialogImgContainer.setAttribute("aria-label", mediaTag[mediaIndex].title);
                    } else if (mediaTag[mediaIndex].video) {
                        let videoSourceAttributes = {
                            "src": mediaTag[mediaIndex].mediaPath, 
                            "type": "video/mp4",
                        };
        
                        let videoSource = createMedia("source", videoSourceAttributes);
        
                        let videoAttributes = {
                            "preload": "auto", 
                            "controls": true,
                            class: "photographer-image"
                        };
                        let video = createMedia("video", videoAttributes);
                        video.setAttribute("style", `background: black; width: 25em; height: 25em`);
                        
                        video.appendChild(videoSource);

                        dialogImgContainer.setAttribute("aria-label", mediaTag[mediaIndex].title);
                        dialogImgContainer.appendChild(video);
                        
                    }
                    titleDialog.innerHTML = mediaTag[mediaIndex].title;
                }            

                dialogPrevious.addEventListener("click", function() {
                    console.log(mediaIndex)
                    if(mediaIndex == 0) {
                        mediaIndex = mediaTag.length-1
                    } else {
                        mediaIndex--;
                        console.log('lolo')
                    } 
                    defineDialogMedia();
                })

                dialogNext.addEventListener("click", function() {
                    if(mediaIndex == mediaTag.length-1) {
                        mediaIndex = 0
                    } else {
                        mediaIndex++;
                    }                    
                    defineDialogMedia();
                })

            })

            let width = mediaCard.clientWidth;
            let height = width;

            if (elt.image) {

                let background = elt.mediaPath; 
                window.addEventListener("resize", function () {
                    width = mediaCard.clientWidth;
                    height = width;
                    mediaDiv.setAttribute("style", `background-image: url(${background.replace(" ","%20")}); width: ${width}px; height: ${height}px`);                  
                });

                mediaDiv.setAttribute("style", `background-image: url(${background.replace(" ","%20")}); width: ${width}px; height: ${height}px`)   

            } else if (elt.video) {

                let videoSourceAttributes = {
                    "src": elt.mediaPath, 
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
                    video.setAttribute("style", `background: black ; width: ${width}px; height: ${height}px`);                 
                });

                let video = createMedia("video", videoAttributes);

                video.appendChild(videoSource);

                mediaDiv.appendChild(video);
                video.setAttribute("style", `background: black ; width: ${width}px; height: ${height}px`);
            }

            let bannerMedia = document.createElement("div");
            bannerMedia.className = "banner-media";

            let title = document.createElement("h3");
            title.innerHTML = elt.title;

            let likes = document.createElement("div");
            likes.innerHTML = elt.likes+" ";

            let heartAttributes = {
                "aria-label": "likes", 
                class: "fa fa-heart"
            };
            
            let heart = createMedia("i", heartAttributes);
            
            mediaCard.appendChild(mediaLink);
            mediaCard.appendChild(bannerMedia);
            bannerMedia.appendChild(title);
            bannerMedia.appendChild(likes);
            likes.appendChild(heart);
        })
    })
    .catch((error) => {
        console.log("erreur survenue"+error);
    })
}

eventHandler();

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
    for ( const attribute in attributes) {
        tag.setAttribute(attribute, attributes[attribute])
    }
    return tag;
}