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
    const fileContent = buff.toJSON();
    console.log("TYPE OFF")
    console.log(typeof fileContent)
    console.log("The content")
    console.log(fileContent);
    console.log("The VERSION")
    console.log(fileContent.version);
    Object.keys(fileContent).forEach(function(key,index) {
      console.log('LOOOOOOPP')
      console.log(key);
      console.log(fileContent[key]);
  });
    return fileContent;
  } catch (e) {
    throw e;
  }
}
