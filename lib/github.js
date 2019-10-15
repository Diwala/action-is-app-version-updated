const github = require('@actions/github');
const core = require('@actions/core');

let octokit;

export const init = () => {
  const token = core.getInput('token');
  octokit = new github.GitHub(token);
};

export const getFileContent = async path => {
  const owner = core.getInput('owner');
  const repo = core.getInput('repo');
  const { data: res } = await octokit.repos.getContents({
    owner,
    repo,
    path
  });
  const buff = Buffer.from(res.content, 'base64');
  const fileContent = buff.toString('utf8');
  return fileContent;
};
