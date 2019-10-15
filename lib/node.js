/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
const core = require('@actions/core');
const fs = require('fs');
const { getFileContent } = require('./github');

// eslint-disable-next-line import/prefer-default-export
export const checkNodeVersion = async (path) => {
  try {
    const filePath = `${path}/package.json`;
    const oldPkgJsonString = await getFileContent(filePath);
    const oldPkgJson = JSON.parse(oldPkgJsonString);
    const newPgkJson = JSON.parse(fs.readFileSync(`./${filePath}`, 'utf-8'))
    if (oldPkgJson.version === newPgkJson.version) {
      core.setFailed('Need a new package.json version');
      return;
    }
    console.log('Package.json check all good');
  } catch (e) {
    console.log('An unexpected error happened with node check');
    console.log(e);
    throw e;
  }
};
