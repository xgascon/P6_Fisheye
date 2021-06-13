// Définition de constantes
const sectionArtists = document.querySelector(".section-artists");
const mainNavbarRedirection = document.querySelector(".main-navbar-redirection")

$(function () {
  $(window).on('scroll', function () {
      if ( $(window).scrollTop() > 10 ) {
        mainNavbarRedirection.style.display = 'block';
      } else {
        mainNavbarRedirection.style.display = 'none';
      }
  });
});

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

