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
    const buff = Buffer.from(res.content, 'base64');
    const fileContent = buff.toString('utf8');
    console.log("TYPE OFF")
    console.log(typeof fileContent)
    const parsed = JSON.parse(fileContent);
    console.log(typeof parsed)
    console.log(parsed.version)
    return parsed;
  } catch (e) {
    throw e;
  }
}
