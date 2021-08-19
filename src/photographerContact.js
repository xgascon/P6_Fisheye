import {createMedia, launchModal} from "./photographerFunctions"

// Définition des constantes
const sectionProfile = document.querySelector(".photographer-section-contact");
const modalHeader = document.getElementById("modal-header");
const modalInitial = document.getElementById("modal-initial");

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

// Récupération de l'identifiant du photographe d'après l'adresse URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

// Generate the photographer's contact content 
function eventHandler() {
    import('../content.json')
    .then((ns) => {
        // Get the photographer in the content.json
        const photographer = ns.photographers.find(photographer => photographer.id == id);

        // Add the photographer's name to the contact form header
        modalHeader.innerHTML = "Contactez-moi<br>"+photographer.name;

        // Create the photographer's portrait
        let portraitContainer = document.createElement("div");
        portraitContainer.className = "portrait-container";

        let backgroundPortrait = "./images/Photographers%20ID%20Photos/"+photographer.portrait;
        portraitContainer.setAttribute("style", `background-image: url(${backgroundPortrait.replace(" ","%20")})`);
        portraitContainer.setAttribute("aria-label", "portrait de "+photographer.name);

        // Create the photographer's detailed information
        let contactDiv = document.createElement("div");
        contactDiv.className = "contact-div";        

        let contactText = document.createElement("div");
        contactText.className = "contact-text";

        let contactHeader = createMedia("h1", contactHeaderAttributes);
        contactHeader.innerHTML = photographer.name;

        let contactParagraph = document.createElement("p");        

        let contactLocation = createMedia("span", contactLocationAttributes);
        contactLocation.innerHTML = photographer.city+", "+photographer.country;

        let contactTagline = createMedia("span", contactTaglineAttributes);
        contactTagline.innerHTML = "<br>"+photographer.tagline;

        // Create the contact button
        let contactButtonDiv = document.createElement("div");
        contactButtonDiv.className = "contact-div-button";

        let contactButton = createMedia("button", contactButtonAttributes);
        contactButton.innerHTML = "Contactez-moi";
        contactButton.setAttribute("aria-label", "Contactez-moi");
        contactButton.addEventListener("click", function () {
            launchModal(modalInitial)
            modalInitial.setAttribute("aria-labelledby", "modal-header")
            document.getElementById('first').focus();
        });

        // Create the photographer's tags list and correct the "sports" tag from content.json
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

        // Assemble all elements
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
    })
}

// Call the function
eventHandler();