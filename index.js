/* eslint-disable no-console */
const core = require('@actions/core');
const { init, getFileContent } = require('./lib/github');
const { checkNodeVersion } = require('./lib/node');

try {
  init();

  const typeCheck = core.getInput('type-check');
  const path = core.getInput('file-path');

  if (typeCheck === 'node') {
    checkNodeVersion(path);
  }
  if (typeCheck === 'android') {
    const filePath = `${path}/build.gradle`;
    const file = getFileContent(filePath);
    console.log(file);
  }
} catch (error) {
  core.setFailed(error.message);
}
