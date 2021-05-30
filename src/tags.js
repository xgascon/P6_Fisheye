// Récupération de l'identifiant du photographe d'après l'adresse URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const tag = urlParams.get('tag');

const sectionMedia = document.querySelector(".section-media");
const mediaContenant = document.getElementById("media-contenant") ;
// let mediaContenanttest ;

const orderBy = document.querySelector(".order-by");

// Gérer la fonction pour que criteria s'adapte en fonction du sortCriteria
function sorting(table, sortCriteria) {
    let x = sortCriteria == "titre" ? 1 : -1;
    let y = sortCriteria == "titre" ? -1 : 1;
    let criteria = "likes";
    console.log('passe ici');
    console.log(criteria);
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

        // let mediaTag = [];
        let imageMedia = [];
        let photographerMediaId = [];

        let arrayMediaToInput = []; //contient objets avec nom image, chemin et nom photographe

        // To do 
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

        // let mediaTag = ns.media.filter(function(element){
        //     return element.tags.includes("fashion");
        // });

        // mediaTag.map(function(element){
        //     let photographer = ns.photographers.find(photographer => photographer.id == element.photographerId);
        //     let photographerSurname = photographer.name.split(' ')[0];
        //     photographerSurname = photographerSurname.replaceAll("-", " ");
        //     let mediaPath = "./images/"+photographerSurname+"/"+element.image;
        //     element.imagePath = mediaPath; 
        //     element.photographer = photographer;
        //     return element;
        // })

        console.log("mediaTag")
        console.log(mediaTag)

        // To do 

        mediaTag = sorting(mediaTag, sortCriteria)
                // if (sortCriteria == "popularite") {
                //     mediaTag.sort((a, b) => (a.likes > b.likes) ? -1 : 1);
                //     console.log(sortCriteria);
                // } else if (sortCriteria == "date") {
                //     mediaTag.sort((a, b) => (a.date > b.date) ? -1 : 1);
                //     console.log(sortCriteria);
                // } else if (sortCriteria == "titre") {
                //     mediaTag.sort((a, b) => (a.title > b.title) ? 1 : -1);
                //     console.log(sortCriteria);
                // }

        console.log("mediaTag avec sorting")
        console.log(mediaTag)
        // mediaTag.forEach(element => {
        //     console.log(element.photographerId + element.image);
        //     imageMedia.push(element.image);
        //     photographerMediaId.push(element.photographerId)
        // });

        // console.log(photographerMediaId)

        // let photographerMediaName = [];

        

        // To do 
            // photographerMediaId.forEach(idToTranslate => {
            //     console.log("aa"+idToTranslate)
                
            //     ns.photographers.forEach(photographer => {
            //         let photographerSurname = photographer.name.split(' ')[0];
            //         if(idToTranslate == photographer.id) {
            //             console.log("ff"+idToTranslate)

            //             // To do 
            //             if(photographerSurname.split('-').length > 1) {
            //                 let nameBitsAssembled = photographerSurname.split('-')[0];
            //                 for (i = 1; i <= photographerSurname.split('-').length-1; i++) {
            //                     nameBits = " "+photographerSurname.split('-')[i];
            //                     nameBitsAssembled += nameBits;
            //                 }
            //                 photographerSurname = nameBitsAssembled;
            //             }
            //             photographerMediaName.push(photographerSurname)
            //         }
            //     })
            // });

        // console.log(photographerMediaName)
        // console.log(imageMedia)

        // let arrayPath = []

        // for (i = 0; i <= photographerMediaName.length-1; i++) {
        //     arrayPath.push("./images/"+photographerMediaName[i]+"/"+imageMedia[i])
        // }

        // console.log(arrayPath)

        mediaTag.forEach(elt => {
            let mediaCard = document.createElement("div");
            mediaCard.className = "media-card";

            if (elt.image) {

                let imageTagAttributes = {
                    "src": elt.mediaPath, 
                    class: "photographer-image"
                };
        
                let imageTag = createMedia("img", imageTagAttributes);
                
                mediaContenant.appendChild(mediaCard);
                mediaCard.appendChild(imageTag);
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

                mediaContenant.appendChild(mediaCard);
                mediaCard.appendChild(video);
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

            mediaCard.appendChild(bannerMedia);
            bannerMedia.appendChild(title);
            bannerMedia.appendChild(likes);
            likes.appendChild(heart);
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
}