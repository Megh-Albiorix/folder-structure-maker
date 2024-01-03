export interface fileInterface {
	name: string;
}

export interface folderInterface {
	name: string;
	_children: (fileInterface | folderInterface)[];
}

class rootFolderClass {
	public name: string;
	static _children: (file | folder)[];

	constructor(name: string) {
		this.name = name;
		rootFolderClass._children = [];
	}

	public getChildren() {
		return rootFolderClass._children;
	}

	public pushChildren(name: file | folder) {
		if (name instanceof file || name instanceof folder) {
			if (
				rootFolderClass._children.find((element) => element.name === name.name)
			) {
				throw new Error("files or folders with same name are not allowed");
			}
			rootFolderClass._children.push(name);
		} else {
			throw new Error("Invalid folder or File");
		}
	}
	public removeChild(name: string) {
		rootFolderClass._children = rootFolderClass._children.filter(
			(element) => name !== element.name
		);
	}
}

export class folder implements folderInterface {
	name: string;
	_children: (file | folder)[];

	constructor(name: string) {
		this.name = name;
		this._children = [];
	}

	public getChildren() {
		return this._children;
	}

	public pushChildren(name: file | folder) {
		if (name instanceof file || name instanceof folder) {
			if (this._children.find((element) => element.name === name.name)) {
				throw new Error("files or folders with same name are not allowed");
			}
			this._children.push(name);
		} else {
			throw new Error("Invalid folder or File");
		}
	}

	public removeChild(name: string) {
		this._children = this._children.filter((element) => name !== element.name);
	}
}

export class file implements fileInterface {
	constructor(public name: string) {
		this.name = name;
	}
}

const rootFolder = new rootFolderClass("rootFolder");
export default rootFolder;
