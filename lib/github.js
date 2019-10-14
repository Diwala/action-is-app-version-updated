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
    const owner = core.getInput('owner');
    const repo = core.getInput('repo');
    const { data: res } = await octokit.repos.getContents({
      owner,
      repo,
      path
    })
    const buff = new Buffer(res, 'base64');
    const fileContent = buff.toString('ascii');
    console.log(fileContent);
    return fileContent;
  } catch (e) {
    throw e;
  }
}
