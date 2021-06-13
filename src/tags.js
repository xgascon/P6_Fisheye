<<<<<<< HEAD
// Récupération de l'identifiant du photographe d'après l'adresse URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const tag = urlParams.get('tag');

const sectionMedia = document.querySelector(".section-media");
const mediaContenant = document.getElementById("media-contenant") ;
const orderBy = document.querySelector(".order-by");
const dialog = document.getElementById('dialog');
const dialogImgContainer = document.getElementById('dialog-img-container');
const dialogBannerMedia = document.getElementById('dialog-banner-media');
const dialogClose = document.getElementById('dialog-close');
const titleDialog = document.getElementById('title-dialog');
const dialogPrevious = document.getElementById('dialog-previous');
const dialogNext = document.getElementById('dialog-next');

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
};

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
            if (elementTags.includes(tag)){
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
            mediaCard.className = "media-card";

            mediaContenant.appendChild(mediaCard);

            let mediaDiv = document.createElement("div");
            mediaDiv.className = "image-container";

            mediaDiv.addEventListener("click", function() {
                let mediaIndex = (mediaTag.findIndex(element => element == elt))
                dialog.style.display = 'flex';
                dialog.showModal();

                defineDialogImg()

                function defineDialogImg() {
                    let backgroundDialog = mediaTag[mediaIndex].mediaPath;
                    dialogImgContainer.setAttribute("style", `background-image: url(${backgroundDialog.replace(" ", "%20")}); width: 25em; height: 25em`);
                    titleDialog.innerHTML = mediaTag[mediaIndex].title;
                }            

                dialogPrevious.addEventListener("click", function() {
                    if(mediaIndex == 0) {
                        mediaIndex = mediaTag.length-1
                    } else {
                        mediaIndex--;
                    } 
                    defineDialogImg();
                })

                dialogNext.addEventListener("click", function() {
                    if(mediaIndex == mediaTag.length-1) {
                        mediaIndex = 0
                    } else {
                        mediaIndex++;
                    }                    
                    defineDialogImg();
                })

            })

            if (elt.image) {

                let background = elt.mediaPath;                
                mediaDiv.setAttribute("style", `background-image: url(${background.replace(" ","%20")})`);

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

                let video = createMedia("video", videoAttributes);

                video.appendChild(videoSource);

                mediaDiv.appendChild(video);
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

            mediaCard.appendChild(mediaDiv);
            mediaCard.appendChild(bannerMedia);
            bannerMedia.appendChild(title);
            bannerMedia.appendChild(likes);
            likes.appendChild(heart);

            for (let i = 0; i < document.getElementsByClassName("image-container").length; i++) {
                const element = document.getElementsByClassName("image-container")[i];
                let width = document.querySelector(".media-card").clientWidth;
                let height = width; 
                let style = element.getAttribute("style");            
                element.setAttribute("style", `${style}; width: ${width}px; height: ${height}px`);  
            }
        })
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
    for ( const attribute in attributes) {
        tag.setAttribute(attribute, attributes[attribute])
    };
    return tag;
=======
// Récupération de l'identifiant du photographe d'après l'adresse URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const tag = urlParams.get('tag');

const sectionMedia = document.querySelector(".section-media");
const mediaContenant = document.getElementById("media-contenant") ;
const orderBy = document.querySelector(".order-by");
const dialog = document.getElementById('dialog');
const dialogImgContainer = document.getElementById('dialog-img-container');
const dialogBannerMedia = document.getElementById('dialog-banner-media');
const dialogClose = document.getElementById('dialog-close');
const titleDialog = document.getElementById('title-dialog');
const dialogPrevious = document.getElementById('dialog-previous');
const dialogNext = document.getElementById('dialog-next');

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
};

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
            if (elementTags.includes(tag)){
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
            mediaCard.className = "media-card";

            mediaContenant.appendChild(mediaCard);

            let mediaDiv = document.createElement("div");
            mediaDiv.className = "image-container";

            mediaDiv.addEventListener("click", function() {
                let mediaIndex = (mediaTag.findIndex(element => element == elt))
                dialog.style.display = 'flex';
                dialog.showModal();

                defineDialogImg()

                function defineDialogImg() {
                    let backgroundDialog = mediaTag[mediaIndex].mediaPath;
                    dialogImgContainer.setAttribute("style", `background-image: url(${backgroundDialog.replace(" ", "%20")}); width: 25em; height: 25em`);
                    titleDialog.innerHTML = mediaTag[mediaIndex].title;
                }            

                dialogPrevious.addEventListener("click", function() {
                    if(mediaIndex == 0) {
                        mediaIndex = mediaTag.length-1
                    } else {
                        mediaIndex--;
                    } 
                    defineDialogImg();
                })

                dialogNext.addEventListener("click", function() {
                    if(mediaIndex == mediaTag.length-1) {
                        mediaIndex = 0
                    } else {
                        mediaIndex++;
                    }                    
                    defineDialogImg();
                })

            })

            if (elt.image) {

                let background = elt.mediaPath;                
                mediaDiv.setAttribute("style", `background-image: url(${background.replace(" ","%20")})`);

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

                let video = createMedia("video", videoAttributes);

                video.appendChild(videoSource);

                mediaDiv.appendChild(video);
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

            mediaCard.appendChild(mediaDiv);
            mediaCard.appendChild(bannerMedia);
            bannerMedia.appendChild(title);
            bannerMedia.appendChild(likes);
            likes.appendChild(heart);

            for (let i = 0; i < document.getElementsByClassName("image-container").length; i++) {
                const element = document.getElementsByClassName("image-container")[i];
                let width = document.querySelector(".media-card").clientWidth;
                let height = width; 
                let style = element.getAttribute("style");            
                element.setAttribute("style", `${style}; width: ${width}px; height: ${height}px`);  
            }
        })
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
    for ( const attribute in attributes) {
        tag.setAttribute(attribute, attributes[attribute])
    };
    return tag;
>>>>>>> 6e2008b7b6b65abde9df2622d42fb2cf272ef3af
}