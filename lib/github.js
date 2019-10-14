const github = require('@actions/github');
const core = require('@actions/core');

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
    const buff = new Buffer(data, 'base64');
    const file = buff.toString('ascii');
    return file;
  } catch (e) {
    throw e;
  }
}
