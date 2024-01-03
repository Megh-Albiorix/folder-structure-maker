import rootFolder, { folder, file } from "./folderStructure";

const newFile = new file("index.js");
const newFolder = new folder("public");

rootFolder.pushChildren(newFile);
rootFolder.pushChildren(newFolder);

newFolder.pushChildren(new file("readme.txt"));
newFolder.pushChildren(new file("readme1.txt"));
const src = new folder("src");
newFolder.pushChildren(src);

console.log(rootFolder);

export default rootFolder;
