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
    const fileContent = buff.toString('ascii');
    console.log("TYPE OFF")
    console.log(typeof fileContent)
    console.log("The content")
    console.log(fileContent);
    console.log("The VERSION")
    console.log(fileContent.version);
    const trimmedContent = fileContent.trim();
    const contentString = JSON.stringify(trimmedContent);
    console.log("CONTENT STRING")
    console.log(contentString); 
    console.log(JSON.parse(contentString)); 
    console.log("TRIMMED CONTENT")
    console.log(trimmedContent); 
    return trimmedContent;
  } catch (e) {
    throw e;
  }
}
