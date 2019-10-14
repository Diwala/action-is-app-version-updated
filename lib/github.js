const github = require('@actions/github');
const core = require('@actions/core');
const { decode } = require('base-64');

let octokit;

export const init = () => {
  try {
    const token = core.getInput('token');
    octokit = new github.GitHub(token);
  } catch (e) {
    throw e;
  }
}

export const getFileContent = async (path) => {
  try {
    const { data: res } = await octokit.repos.getContents({
      path
    })
    const file = decode(res.content);
    return file;
  } catch (e) {
    throw e;
  }
}
