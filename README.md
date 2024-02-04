# NFT Collection Processor and Uploader

This repository is designed to facilitate the processing and uploading of images and metadata for an NFT collection to IPFS. It efficiently uploads image files, retrieves the CID (Content Identifier) for the entire collection, and integrates this CID into the `file_url` path key within the metadata files after removing the `.json` extension. Subsequently, it uploads the metadata and records the CID information in a `CID.txt` file located in the home directory.

## Preparation

Create an account and space using web3.storage: https://web3.storage/docs/

Before initiating the upload process, ensure your files are organized as follows:

- Move image files labeled from `1.png` to `{i}.png` into the `/files/images` folder.
- Move the corresponding metadata files labeled from `1.json` to `{i}.json` into the `/files/metadata` folder.

## Installation

Ensure that you have Node.js installed on your system. Then, install the necessary dependencies by running:

```bash
npm install @web3-storage/w3up-client files-from-path dotenv
```

## Environment Setup

Create a .env file in the root of your project directory with the following content, replacing the placeholder values with your actual Web3.Storage credentials:

```plaintext 
EMAIL=your_email@example.com
SPACE_DID=did:key:your_space_did
```

This file will be automatically used by dotenv to set environment variables.

## Process and Upload

```bash
node main.js
```

## Additional Information

- Web3.Storage Client Initialization: Initializes the Web3.Storage client and logs in using the provided email address. This step will prompt an email validation.
- Image Upload: Uploads the image files from the /files/images directory and logs the directory CID.
- Metadata Formatting and Updating: Modifies the metadata files by replacing the placeholder URI with the actual directory CID and removes the .json extension.
- Metadata Upload: Uploads the formatted metadata files and logs the metadata CID.
- CID Recording: Outputs the CIDs of both the image files and metadata uploads to a CID.txt file for easy access.

Ensure all steps in the Preparation section are completed before executing the script to avoid any errors during the process.

## Troubleshooting

If you encounter any issues during the setup or execution process, verify the following:

- All dependencies are correctly installed and up-to-date.
- The .env file is correctly configured with your Web3.Storage credentials.
- The directory paths in the script match the structure of your project.

For more detailed information on Web3.Storage and its API, refer to the official documentation: https://web3.storage/docs/