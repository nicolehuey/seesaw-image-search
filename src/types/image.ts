import { FlickrPhoto } from "./flickr";

export interface ImageModalProps {
    photo: FlickrPhoto | null;
    isOpen: boolean;
    onClose: () => void;
  }
  
export interface ImageCardProps {
    photo: FlickrPhoto;
    onClick: (photo: FlickrPhoto) => void;
}

export interface SearchDescriptionProps {
    resultTitle: string;
    resultDescription: string;
}
