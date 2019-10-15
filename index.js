/* eslint-disable no-console */
const core = require('@actions/core');
const { init } = require('./lib/github');
const { checkNodeVersion } = require('./lib/node');
const { checkAndroidVersion } = require('./lib/android');

try {
  init();

  const typeCheck = core.getInput('type-check');
  const path = core.getInput('file-path');

  if (typeCheck === 'node') {
    checkNodeVersion(path);
  }
  if (typeCheck === 'android') {
    checkAndroidVersion(path);
  }
} catch (error) {
  core.setFailed(error.message);
}
