// Function for shortcut to create media with attributes
export function createMedia(tagName, attributes) {
    let tag = document.createElement(tagName);
    for (const attribute in attributes) {
        tag.setAttribute(attribute, attributes[attribute])
    }
    return tag;
}
 
// Launch modals
export function launchModal(modal) {
    modal.style.display = "block";
}

// Close modals
export function closeModal(modal) {
    modal.style.display = "none";
}

// Gérer la fonction pour que criteria s'adapte en fonction du sortCriteria
export function sorting(table, sortCriteria) {
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

// Generate the dialog window content
export function defineDialogMedia(arrayMedia, photographerSurnameFolder, mediaIndex, dialogImgContainer, titleDialog) {
    // For an image, set the image as the background 
    if (arrayMedia[mediaIndex].image) {
        if (dialogImgContainer.firstElementChild) {
            dialogImgContainer.removeChild(dialogImgContainer.firstElementChild);
        }
        let backgroundDialog = "./images/"+photographerSurnameFolder+"/"+arrayMedia[mediaIndex].image;
        dialogImgContainer.setAttribute("style", `background-image: url(${backgroundDialog.replace(" ", "%20")});`);
        dialogImgContainer.setAttribute("aria-label", "photo de "+arrayMedia[mediaIndex].title);
    // For a video, set the background to none and insert the video into the dialogImgContainer
    } else if (arrayMedia[mediaIndex].video) {
        dialogImgContainer.setAttribute("style", `background-image: none`);
        let videoSourceAttributes = {
            "src": "./images/"+photographerSurnameFolder+"/"+arrayMedia[mediaIndex].video, 
            "type": "video/mp4",
        };

        let videoSource = createMedia("source", videoSourceAttributes);

        let videoAttributes = {
            "preload": "auto", 
            "controls": true,
            class: "photographer-image"
        };
        let video = createMedia("video", videoAttributes);
        video.setAttribute("style", `background: black;`);
        video.appendChild(videoSource);

        dialogImgContainer.setAttribute("aria-label", arrayMedia[mediaIndex].title);
        dialogImgContainer.appendChild(video);
    }
    // Set the dialog window title 
    titleDialog.innerHTML = arrayMedia[mediaIndex].title;
}      

// Insert the media
export function insertBground(mediaPhotographer, photographerSurnameFolder, mediaBtn, mediaCard) {
    // Get the dimensions for a perfect square
    let width = mediaCard.clientWidth;
    let height = width;

    // For an image, set the image as the background 
    if (mediaPhotographer.image) {
        let background = "./images/"+photographerSurnameFolder+"/"+mediaPhotographer.image;
        mediaBtn.setAttribute("style", `background-image: url(${background.replace(" ","%20")}); width: ${width}px; height: ${height}px`);
        window.addEventListener("resize", function () {
            width = mediaCard.clientWidth;
            height = width;
            mediaBtn.setAttribute("style", `background-image: url(${background.replace(" ","%20")}); width: ${width}px; height: ${height}px`)                  
        });
    // For a video, insert the video in the mediaBtn
    } else if (mediaPhotographer.video) {
        let videoSourceAttributes = {
            "src": "./images/"+photographerSurnameFolder+"/"+mediaPhotographer.video, 
            "type": "video/mp4",
        };
    
        let videoAttributes = {
            "preload": "auto", 
            "controls": true,
            class: "photographer-image"
        };
        
        // Resize the video when user changes the window width 
        window.addEventListener("resize", function () {
            width = mediaCard.clientWidth;
            height = width;
            video.setAttribute("style", `background: black; width: ${width}px; height: ${height}px`)                  
        });
    
        let videoSource = createMedia("source", videoSourceAttributes);
    
        let video = createMedia("video", videoAttributes);
        video.setAttribute("style", `background: black ; width: ${width}px; height: ${height}px`);
        
        mediaBtn.appendChild(video);
        video.appendChild(videoSource);
    }    
}
