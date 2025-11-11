import type { Image } from "./Image";

export interface Partner {
  documentId: string;
  name: string;  
  image: Image;
}

export interface PartnerSection {
  documentId: string;
  title: string;  
}
