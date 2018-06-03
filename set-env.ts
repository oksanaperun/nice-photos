import { writeFile } from 'fs';

// This is good for local dev environment, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const envConfigFile = `
export const environment = {
  production: false,
  apiBase: 'https://api.unsplash.com',
  clientId: '${process.env.CLIENT_ID}'
};
`
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
