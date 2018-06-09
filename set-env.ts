import { writeFile } from 'fs';
import { argv } from 'yargs';

// This is good for local dev environment, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

const environment = argv.env;
const isProd = environment === 'prod';
const isProdFileName = isProd ? '.prod' : '';

const targetPath = `./src/environments/environment${isProdFileName}.ts`;
const envConfigFile = `
export const environment = {
  production: ${isProd},
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
