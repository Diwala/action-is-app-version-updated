/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
const core = require('@actions/core');
const g2js = require('gradle-to-js/lib/parser');
const { getFileContent } = require('./github');


// eslint-disable-next-line import/prefer-default-export
export const checkAndroidVersion = async (path) => {
  try {
    const filePath = `${path}/build.gradle`;
    const oldGradleFile = await getFileContent(filePath);
    const oldGradleFileJson = await g2js.parseText(oldGradleFile);
    const newGradleFileJson = await g2js.parseFile(`./${filePath}`);
    console.log(oldGradleFileJson)
    console.log(newGradleFileJson)
    core.setFailed('Need a new package.json version');
    // if (oldPkgJson.version === newPgkJson.version) {
    //   core.setFailed('Need a new package.json version');
    //   return;
    // }
    // console.log('Package.json check all good');
  } catch (e) {
    console.log('An unexpected error happened with node check');
    console.log(e);
    throw e;
  }
};