import {createMedia} from "./photographerFunctions"
import {heartAttributes} from "./photographer"

// Définition des constantes
const photographerBelowElements = document.querySelector(".photographer-belowElements");

// Récupération de l'identifiant du photographe d'après l'adresse URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

// Create elements for information that stand below (likes and price)
export function belowElements () {
    import('../content.json')
    .then((ns) => {  
        // Set to empty the content  
        photographerBelowElements.innerHTML = "";

        // Get the photographer in the content.json 
        const photographer = ns.photographers.find(photographer => photographer.id == id);

        // Create the elements
        let heart1 = createMedia("i", heartAttributes);
        let photographerLikes = document.createElement("div"); 
        let photographerLikesNumber = 0;

        // Push all the photographer's media into an array
        let arrayMedia = [];
        var response = ns.media;
        response.forEach(media => {
            if (media.photographerId == id) {
                arrayMedia.push(media)
            }
        });

        // Get and sum up the number of likes for each media       
        arrayMedia.forEach(mediaPhotographer => {
            photographerLikesNumber += mediaPhotographer.likes;
        })
        photographerLikes.innerHTML = photographerLikesNumber+" ";        

        // Get the photographer's price
        let photographerPrice = document.createElement("div");
        photographerPrice.innerHTML = photographer.price+"€ / jour";

        // Assemble the elements
        photographerBelowElements.appendChild(photographerLikes);
        photographerLikes.appendChild(heart1);
        photographerBelowElements.appendChild(photographerPrice);
    })
    .catch((error) => {
        console.log("erreur survenue dans belowElements"+error);
    })
}

// Call the function
belowElements();