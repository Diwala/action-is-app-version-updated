const core = require('@actions/core');
const { getFileContent } = require('./github');

export const checkNodeVersion = (path) => {
    try {
      const filePath = `${path}/package.json`;
      const oldPkgJson = getFileContent(filePath);
      console.log('THE OBJECT')
      console.log(oldPkgJson)
      console.log("JSON VERSION")
      console.log(oldPkgJson.version)
      const newPgkJson = require(filePath);
      console.log("NEW PACKAGS JOSN")
      console.log(newPgkJson);
      console.log(newPgkJson.version)
      if(oldPkgJson.version === newPgkJson.version) {
        core.setFailed('Need a new package.json version');
        return;
      }
      console.log(`Package.json check all good`);
    } catch (e) {
      console.log('ERRROR');
      console.log(e);
      throw e;
    }
  }