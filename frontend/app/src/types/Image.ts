export interface Image {
  documentId: string;
  alternativeText: string;
  caption: string;
  ext: string;
  hash: string;
  height: number;
  id: number;
  mime: string;
  name: string;
  previewUrl: string | null;
  provider: string;
  size: number;
  url: string;
  width: number;
  formats: {
    large: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
    thumbnail: ImageFormat;
    hash: string;
    height: number;
    id: number;
    mime: string;
    name: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    size: number;
    url: string;
    width: number;
  };
}

export interface ImageFormat {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  sizeInBytes: number;
  url: string;
  width: number;
}
