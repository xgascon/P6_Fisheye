import {MediaFactory} from "./mediaFactory";

export class CreateMedia {
    static build(arrayMedia, photographerSurnameFolder) {
        arrayMedia.forEach(mediaPhotographer => {            
            MediaFactory.build(mediaPhotographer, arrayMedia, photographerSurnameFolder)
        });
    }
} 