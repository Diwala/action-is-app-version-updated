/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
const core = require('@actions/core');
const exec = require('@actions/exec');
const g2js = require('gradle-to-js/lib/parser');
const { getFileContent } = require('./github');


// eslint-disable-next-line import/prefer-default-export
export const checkAndroidVersion = async (path) => {
  try {
    const filePath = `${path}/build.gradle`;
    const oldGradleFile = await getFileContent(filePath);
    const oldGradleFileJson = await g2js.parseText(oldGradleFile);
    const newGradleFileJson = await g2js.parseFile(`./${filePath}`);
    const oldConfig = oldGradleFileJson.android.defaultConfig;
    const newConfig = newGradleFileJson.android.defaultConfig;
    const branch = await exec.exec('git branch');
    // eslint-disable-next-line no-useless-escape
    const branch2 = await exec.exec('git branch | grep \* | cut -d " " -f2');
    console.log('BRANCH');
    console.log(branch);
    console.log(branch2);
    console.log(process.env.GITHUB_REF);
    console.log('CONFIGSSS');
    console.log(oldConfig);
    console.log(newConfig);
    if (oldConfig.versionCode === newConfig.versionCode) {
      const message = `️️️
⛔️️⛔️Need a new version for android/app/build.gradle ⛔️️⛔️
1. Update the package.json of packages/mobile
2. Run 'fastlane version_bump_commit' from packages/mobile/android folder
3. Push new commited code
Then you should have bumped the version code
And used the update package.json version with the new version code for mobile version
`;
      core.setFailed(message);
      return;
    }
    console.log('✅✅Android version check all good✅✅');
  } catch (e) {
    console.log('An unexpected error happened with node check');
    console.log(e);
    throw e;
  }
};
