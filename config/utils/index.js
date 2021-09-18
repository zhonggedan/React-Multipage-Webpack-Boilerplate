const path = require("path");
const glob = require("glob");

const getEntry = () => {
  let globPath = "src/**/template/*.html";
  let pathDir = "src(/|\\\\)(.*?)(/|\\\\)template";
  let files = glob.sync(globPath);
  let dirname,
    entries = [];
  for (let i = 0; i < files.length; i++) {
    dirname = path.dirname(files[i]);
    entries.push(dirname.replace(new RegExp("^" + pathDir), "$2"));
  }
  return entries;
};

module.exports = getEntry;
