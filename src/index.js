// Définition de constantes
const sectionArtists = document.querySelector(".section-artists");

function eventHandler() {
    import('../content.json')
    .then((ns) => {
        var response = ns.photographers;
        console.log(response);
        response.forEach(artist => {
          let card = document.createElement("div");
          card.className = "card-artists";

          let link = document.createElement("a");
          link.setAttribute("href", "photographer.html?id="+artist.id);
          link.className = "card-artists-link";

          let portraitContainer = document.createElement("div");
          portraitContainer.className = "portrait-container";
          let backgroundPortrait = "./images/Photographers%20ID%20Photos/"+artist.portrait;
          portraitContainer.setAttribute("style", `background-image: url(${backgroundPortrait})`);

          // let portrait = document.createElement("img");
          // portrait.setAttribute("src", "./images/Photographers ID Photos/"+artist.portrait);
          // portrait.setAttribute("alt", "");
          // portrait.className = "portrait-img";

          let artistName = document.createElement("h2");
          artistName.innerHTML = artist.name;
          artistName.className = "artist-name";

          let artistParagraph = document.createElement("p");
          
          let artistLocation = document.createElement("span");
          artistLocation.innerHTML = artist.city+", "+artist.country;
          artistLocation.className = "artist-location";

          let artistTagline = document.createElement("span");
          artistTagline.innerHTML = "<br>"+artist.tagline;
          artistTagline.className = "artist-tagline";

          let artistPrice = document.createElement("span");
          artistPrice.innerHTML = "<br>"+artist.price+"€/jour";
          artistPrice.className = "artist-price";

          let artistTags = document.createElement("ul");
          artistTags.className = "main-navbar-list artist-tags";

          artist.tags.forEach(tag => {
            let artistTagsList = document.createElement("li");

            let tagLink = document.createElement("a");
            tagLink.setAttribute("href", "tags.html?tag="+tag);
            tagLink.innerHTML = "#"+tag;

            artistTags.appendChild(artistTagsList); 
            artistTagsList.appendChild(tagLink);
          });

          sectionArtists.appendChild(card);
          card.appendChild(link);
          link.appendChild(portraitContainer);
          // portraitContainer.appendChild(portrait);
          link.appendChild(artistName);
          card.appendChild(artistParagraph);
          artistParagraph.appendChild(artistLocation);
          artistParagraph.appendChild(artistTagline);
          artistParagraph.appendChild(artistPrice);
          card.appendChild(artistTags);
        })
    })
    .catch((error) => {
      console.log("erreur survenue");
    });
}
// L'appel à la fonction
eventHandler()





// .then(function (response1) {

// var response = JSON.parse(response1);

// // Boucle générant des éléments renfermant les infos de l'API
// response.forEach(produit => {
//     let col = document.createElement("div");
//     col.className = "col-12 col-md-6 mx-auto";
//     let card = document.createElement("div");
//     card.className = "card shadow my-4 py-4";

//     let name = document.createElement("h2");
//     name.className = "card-title text-center";
//     name.innerHTML = produit.name;

//     let p_img = document.createElement("p");
//     p_img.className = "card-text text-center";
//     let a_img = document.createElement("a");
//     a_img.setAttribute("href", "produits.html?id="+produit._id);
//     a_img.setAttribute("target", "_blank");
//     a_img.className = "stretched-link";
//     let img = document.createElement("img");
//     img.setAttribute("src", produit.imageUrl);
//     img.setAttribute("alt", "camera "+produit.name);
//     img.setAttribute("width", "60%");            

//     let p_descr = document.createElement("p");
//     p_descr.className = "card-text text-center mx-2 font-italic";
//     p_descr.innerHTML = produit.description; 

//     let p_price = document.createElement("p");
//     p_price.className = "card-text text-center mx-2";
//     p_price.innerHTML = "Prix : "+Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(produit.price/100);

//     // Imbrication des éléments dans la page web
//     row.appendChild(col);
//     col.appendChild(card);

//     card.appendChild(name);

//     card.appendChild(p_img);
//     p_img.appendChild(a_img);
//     a_img.appendChild(img);

//     card.appendChild(p_descr);

//     card.appendChild(p_price);
// });

// }).catch(function (request1) {
// console.log("Erreur de réponse du serveur");
// });