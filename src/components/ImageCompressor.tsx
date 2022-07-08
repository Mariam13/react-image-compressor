import React from "react";
import Card from "react-bootstrap/Card";
import imageCompression from "browser-image-compression";

import {
  IImageProps,
  IImageState,
  IImageOptions,
} from "@interfaces/IImageCompressor";

export default class ImageCompressor extends React.Component<
  IImageProps,
  IImageState
> {
  constructor(props: IImageProps) {
    super(props);
    this.state = {
      compressedLink:
        "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png",
      originalImage: null,
      originalLink: "",
      clicked: false,
      uploadImage: false,
    };
  }

  handle = (e: HTMLInputElement) => {
    const imageFile: File = e.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true,
    });
  };

  click = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const options: IImageOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
      alert("Image is too small, can't be Compressed!");
      return 0;
    }

    let output: File;
    imageCompression(this.state.originalImage, options).then((x: File) => {
      output = x;

      const downloadLink: string = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink,
      } as IImageState);
    });

    this.setState({ clicked: true } as IImageState);
    return 1;
  };

  render() {
    return (
      <div className="m-5">
        <div className="text-light text-center">
          <h1>Three Simple Steps</h1>
          <h3>1. Upload Image</h3>
          <h3>2. Click on Compress</h3>
          <h3>3. Download Compressed Image</h3>
        </div>

        <div className="row mt-5">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            {this.state.uploadImage ? (
              <Card.Img
                className="ht"
                variant="top"
                src={this.state.originalLink}
              />
            ) : (
              <Card.Img
                className="ht"
                variant="top"
                src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
              />
            )}
            <div className="d-flex justify-content-center">
              <input
                type="file"
                accept="image/*"
                className="mt-2 btn btn-dark w-75"
                onChange={(e) => this.handle(e?.target)}
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
            <br />
            {this.state.outputFileName ? (
              <button
                type="button"
                className=" btn btn-dark"
                onClick={(e) => this.click(e)}
              >
                Compress
              </button>
            ) : null}
          </div>

          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
            <Card.Img variant="top" src={this.state.compressedLink} />
            {this.state.clicked ? (
              <div className="d-flex justify-content-center">
                <a
                  href={this.state.compressedLink}
                  download={this.state.outputFileName}
                  className="mt-2 btn btn-dark w-75"
                >
                  Download
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
