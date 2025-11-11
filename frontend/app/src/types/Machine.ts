import type { Image } from "./Image";

export interface MachineCard {
  documentId: string;
  title: string;
  image: Image;
}

export interface MachineSection {
  documentId: string;
  title: string;
}
