import type { Image } from "./Image";

export interface ServicesCard {
  documentId: string;
  title: string;
  description: string;
  image: Image;
}

export interface ServiceSection {
  documentId: string;
  title: string;  
}
