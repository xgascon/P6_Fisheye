import {closeModal, createMedia, defineDialogMedia, insertBground} from "./photographerFunctions"
import {dialog, dialogClose, dialogImgContainer, dialogNext, dialogPrevious, heartAttributes, heartBtnAttributes, mediaContenant, titleDialog} from "./helper"
import {belowElements} from "./belowElements"

export class MediaFactory {
    static build(mediaPhotographer, arrayMedia, photographerSurnameFolder) {      
        let mediaCard = document.createElement("div");
        mediaCard.className = "media-card media-card-page-display";

        let mediaBtn = document.createElement("button");
        mediaBtn.setAttribute("aria-label", "photo de "+mediaPhotographer.title);
        mediaBtn.className = "image-container";

        let bannerMedia = document.createElement("div");
        bannerMedia.className = "banner-media";

        let title = document.createElement("h3");
        title.innerHTML = mediaPhotographer.title;

        let likes = document.createElement("div");
        likes.className = "banner-media-likes";

        let numLikes = document.createElement("p");

        let heartBtn = createMedia("button", heartBtnAttributes);

        let heart2 = createMedia("i", heartAttributes);

        // Assemble the elements
        mediaContenant.appendChild(mediaCard);
        mediaCard.appendChild(mediaBtn);
        mediaCard.appendChild(bannerMedia);
        bannerMedia.appendChild(title);

        // Insert the media as the background of mediaCard
        insertBground(mediaPhotographer, photographerSurnameFolder, mediaBtn, mediaCard)

        // Generate the dialog window content at the click of the image
        mediaBtn.addEventListener("click", function() {
            let mediaIndex = (arrayMedia.findIndex(element => element == mediaPhotographer));
            dialog.style.display = 'flex';
            document.getElementById('dialog-previous').focus();

            defineDialogMedia(arrayMedia, photographerSurnameFolder, mediaIndex, dialogImgContainer, titleDialog);    
            
            // Functions to navigate through media
            function previousMedia() {
                if(mediaIndex == 0) {
                    mediaIndex = arrayMedia.length-1
                } else {
                    mediaIndex--;
                } 
                defineDialogMedia(arrayMedia, photographerSurnameFolder, mediaIndex, dialogImgContainer, titleDialog); 
            }

            function nextMedia() {
                if(mediaIndex == arrayMedia.length-1) {
                    mediaIndex = 0
                } else {
                    mediaIndex++;
                }                    
                defineDialogMedia(arrayMedia, photographerSurnameFolder, mediaIndex, dialogImgContainer, titleDialog); 
            }

            // Events on click on arrows and cross to close window
            dialogPrevious.addEventListener("click", function() {
                previousMedia();
            })

            dialogNext.addEventListener("click", function() {
                nextMedia();
            })

            dialogClose.addEventListener("click", function() {
                closeModal(dialog)
            })

            // Events for navigation with keyboard only
            document.addEventListener("keydown", function(event) {
                // eslint-disable-next-line default-case
                switch(event.key) {
                    case "ArrowRight":
                        nextMedia();
                        break;
                    case "ArrowLeft":
                        previousMedia();
                        break;
                    case "Escape":
                        closeModal(dialog);
                        break;
                }
            })
        })                        

        // Generate the number of likes for each media
        function showLikes() {
            numLikes.innerHTML = mediaPhotographer.likes+"&nbsp";
            bannerMedia.appendChild(likes);
            likes.appendChild(numLikes);
            likes.appendChild(heartBtn);
            heartBtn.appendChild(heart2);
        }
        showLikes()

        // Increment number of likes on click 
        heartBtn.addEventListener("click", function(){
            mediaPhotographer.likes += 1;
            showLikes()
            belowElements();
        })
    }
}