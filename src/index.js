// Définition de constantes
const sectionArtists = document.querySelector(".section-artists");
const mainNavbarRedirection = document.querySelector(".main-navbar-redirection");
const tagLink = document.querySelectorAll(".tagLink");

// Récupération du tag d'après l'adresse URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const tagUrl = urlParams.get('tag');

function tagClick () {
  tagLink.forEach((btn) => { 
    if(btn.innerText.toLowerCase() == "#"+tagUrl){
      btn.classList.add("main-navbar-list-clicked");
    } 
    btn.addEventListener("click", function (event) {
      if(btn.innerText.toLowerCase() == "#"+tagUrl){
        event.preventDefault()
        window.location="index.html"
      }
    })
  })
}

tagClick();

function navBarScroll () {
  window.addEventListener('scroll', function () {
      if ( document.documentElement.scrollTop > 10 ) {
        mainNavbarRedirection.style.display = 'block';
      } else {
        mainNavbarRedirection.style.display = 'none';
      }
  });
}

navBarScroll();

function eventHandler(filterCriteria = tagUrl) {
    import('../content.json')
    .then((ns) => {
      var response = ns.photographers;
      console.log(response);
      response.forEach(artist => {
        for(var j = 0 ; j < artist.tags.length ; j++){
          if(artist.tags[j] == "sports"){
            artist.tags[j] = "sport"
          }
        }
        function createArtist () {
          let card = document.createElement("div");
          card.setAttribute("aria-label", "profil de "+artist.name);
          card.className = "card-artists";

          let link = document.createElement("a");
          link.setAttribute("href", "photographer.html?id="+artist.id);
          link.className = "card-artists-link";

          let portraitContainer = document.createElement("div");
          portraitContainer.className = "portrait-container";
          portraitContainer.setAttribute("aria-label", "portrait de "+artist.name);
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
            let tagName = tag;
            let artistTagsList = document.createElement("li");

            let tagLink = document.createElement("a");
            tagLink.setAttribute("href", "tags.html?tag="+tagName);
            tagLink.setAttribute("aria-label", tagName);
            tagLink.innerHTML = "#"+tagName;

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
        }
        if(filterCriteria !== null){
          for(var i = 0 ; i < artist.tags.length ; i++){
            if(artist.tags[i] == tagUrl){
              createArtist();
            }
          }
        } else if(filterCriteria === null) {
          createArtist();
        }
      })
    })
    .catch((error) => {
      console.log("erreur survenue"+error);
    });
}
// L'appel à la fonction
eventHandler()

