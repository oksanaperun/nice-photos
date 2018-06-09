import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { argv } from 'yargs';

// This is good for local dev environment, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

const environment = argv.env;
const isProd = environment === 'prod';
const isProdFileName = isProd ? '.prod' : '';

const targetPath = './src/environments';
const targetFilePath = `${targetPath}/environment${isProdFileName}.ts`;
const envConfigFile = `
export const environment = {
  production: ${isProd},
  apiBase: 'https://api.unsplash.com',
  clientId: '${process.env.CLIENT_ID}'
};
`
if (!existsSync(targetPath))
  mkdirSync(targetPath);

writeFileSync(targetFilePath, envConfigFile);
