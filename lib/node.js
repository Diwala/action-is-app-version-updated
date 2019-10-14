const core = require('@actions/core');
const { getFileContent } = require('./github');

export const checkNodeVersion = (path) => {
    try {
      const filePath = `${path}/package.json`;
      const file = getFileContent(filePath);
      const oldPkgJson = JSON.parse(file)
      console.log(oldPkgJson.version)
      const newPgkJson = require(filePath);
      if(oldPkgJson.version === newPgkJson.version) {
        core.setFailed('Need a new package.json version');
        return;
      }
      console.log(`Package.json check all good`);
    } catch (e) {
      throw e;
    }
  }