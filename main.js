import { create } from "@web3-storage/w3up-client";
import { filesFromPaths } from "files-from-path"; // Make sure to install this package if needed
import dotenv from "dotenv";
dotenv.config();

async function uploadFiles() {
  // Initialize the Web3.Storage client
  const client = await create();

  // Login with your email address (this will prompt an email validation)
  await client.login(process.env.EMAIL);

  // The login method will resolve after the user clicks the confirmation link in the email
  // Make sure to replace 'did:key:...' with the actual Space DID associated with your account
  await client.setCurrentSpace(process.env.SPACE_DID);

  let pathToFiles = [];
  // Specify the path to the files you want to upload
  for (let i = 1; i <= 10; i++) {
    pathToFiles.push(`./files/metadata/${i}.json`);
  }
  const files = await filesFromPaths(pathToFiles);

  // // Upload the files
  const directoryCid = await client.uploadDirectory(files);
  console.log(`Directory CID: ${directoryCid}`);
}

uploadFiles().catch(console.error);
