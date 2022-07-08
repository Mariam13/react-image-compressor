export interface IImageProps {}

export interface IImageState {
  clicked: boolean;
  originalImage: File;
  originalLink: string;
  uploadImage: boolean;
  compressedLink: string;
  outputFileName?: string;
}

export interface IImageOptions {
  maxSizeMB: number;
  useWebWorker: boolean;
  maxWidthOrHeight: number;
}
