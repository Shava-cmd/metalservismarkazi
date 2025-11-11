import type { Image } from "./Image";

export interface GallerySection {
  documentId: string;
  title: string;
  images: Image[];
}
