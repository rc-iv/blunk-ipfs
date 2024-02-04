import { create } from "@web3-storage/w3up-client";
import { filesFromPaths } from "files-from-path"; // Make sure to install this package if needed
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
dotenv.config();

async function uploadFiles() {
  // Initialize the Web3.Storage client
  const client = await create();

  // Login with your email address (this will prompt an email validation)
  await client.login(process.env.EMAIL);

  // The login method will resolve after the user clicks the confirmation link in the email
  // Make sure to replace 'did:key:...' with the actual Space DID associated with your account
  await client.setCurrentSpace(process.env.SPACE_DID);

  // Prepare the files to be uploaded
  const imageFiles = await prepareImageFiles();

  // Upload the files
  const directoryCid = await client.uploadDirectory(imageFiles);

  console.log(`Directory CID: ${directoryCid}`);

  // Format and update the metadata files
  await formatAndUpdateMetadata(directoryCid);

  // Prepare the metadata files to be uploaded
  const metaDataFiles = await prepareMataDataFiles();

  // Upload the files
  const metaDataCid = await client.uploadDirectory(metaDataFiles);

  console.log(`Metadata CID: ${metaDataCid}`);

  // Create a text file CID.txt with the CID of the image and metadata uploads
    await fs.writeFile("CID.txt", `Image CID: ${directoryCid}\nMetadata CID: ${metaDataCid}`);
}

async function prepareImageFiles() {
  const directoryPath = "./files/images";
  let pathToImageFiles = [];
  const files = await fs.readdir(directoryPath);
  for (const file of files) {
    pathToImageFiles.push(path.join(directoryPath, file));
  }

  console.log(pathToImageFiles);
  const imageFiles = await filesFromPaths(pathToImageFiles);

  return imageFiles;
}

async function prepareMataDataFiles() {
  const directoryPath = "./files/metadata";
  let pathToMetaDataFiles = [];
  const files = await fs.readdir(directoryPath);
  for (const file of files) {
    pathToMetaDataFiles.push(path.join(directoryPath, file));
  }

  console.log(pathToMetaDataFiles);
  const metaDataFiles = await filesFromPaths(pathToMetaDataFiles);

  return metaDataFiles;
}


async function formatAndUpdateMetadata(targetCID) {
  const directoryPath = "./files/metadata";
  const oldCID = "NewUriToReplace";

  try {
    // Read the directory to get file names
    const files = await fs.readdir(directoryPath);

    for (const fileName of files) {
      // Ensure working with JSON files
      if (path.extname(fileName) === ".json") {
        const filePath = path.join(directoryPath, fileName);

        // Read the file content
        const content = await fs.readFile(filePath, "utf8");

        // Modify the file content (e.g., replacing a CID)
        const modifiedContent = content.replace(oldCID, targetCID);

        // Define the new file name and path (removing the .json extension)
        const newFileName = fileName.replace(".json", ""); // This removes the .json extension
        const newFilePath = path.join(directoryPath, newFileName);

        // Write the modified content to the new file
        await fs.writeFile(newFilePath, modifiedContent, "utf8");

        // Delete the original .json file
        await fs.unlink(filePath);
      }
    }
    console.log("Modification and removal process completed.");
  } catch (error) {
    console.error("Error processing files:", error);
  }
}

uploadFiles();
