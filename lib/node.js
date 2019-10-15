/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
const core = require('@actions/core');
const exec = require('@actions/exec');
const { getFileContent } = require('./github');

// eslint-disable-next-line import/prefer-default-export
export const checkNodeVersion = async (path) => {
  try {
    const filePath = `${path}/package.json`;
    const oldPkgJsonString = await getFileContent(filePath);
    const oldPkgJson = JSON.parse(oldPkgJsonString);
    console.log(oldPkgJson);
    console.log(oldPkgJson.version);
    await exec.exec('ls -la');
    const newPgkJson = require(`./${filePath}`);
    console.log('NEW PACKAGS JOSN');
    console.log(newPgkJson);
    console.log(newPgkJson.version);
    if (oldPkgJson.version === newPgkJson.version) {
      core.setFailed('Need a new package.json version');
      return;
    }
    console.log('Package.json check all good');
  } catch (e) {
    console.log('ERRROR');
    console.log(e);
    throw e;
  }
};
