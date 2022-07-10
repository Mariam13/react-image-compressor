# React Image Compressor

**What it does**
* Compress Image By Reducing Resolution and Size
* Save original and compressed files to S3
* Contains Custom APIs to fetching saved files

*A simple image compressor built with [react](https://reactjs.org/), [next.js](https://nextjs.org/) and [browser-image-compression](https://www.npmjs.com/package/browser-image-compression)*

## Built With

- ReactJS
- Next.js
- React Bootstrap
- Browser Image Compression

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

Need to install a software below to run the project on your local machine:

* [node.js](https://nodejs.org/en/download/) (version >= 18)
* [npm](https://www.npmjs.com/get-npm) (version >= 8)

## Development

1. Clone the repository and change directory.

```
git clone https://github.com/Mariam13/react-image-compressor
cd react-image-compressor
```

2. Install npm dependencies

```
npm install
```

3. To allow S3 uploading you should create a local environment file in the main directory and add all necessary configs to connect AWS Bucket

So, to create a local environment file run the following command on terminal

```
touch .env.local
```

After you should fill this AWS configurations

```
AWS_S3_BUCKET_NAME_ID=
AWS_S3_ACCESS_KEY_ID=
AWS_S3_SECRET_ACCESS_KEY=
```

4. Run the app locally.

```
npm run dev
```
By default it will run on `http://localhost:3000` server

`If you want to build the app use "npm run build" command`

## Postman collection

You can find all the available APIs on this postman collection ([click here](https://www.getpostman.com/collections/196480fed7c3fd5e6d0a))
