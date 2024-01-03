import { Dispatch, SetStateAction } from "react";
import File from "./File";
import Folder from "./Folder";

type propsType = {
	name: string;
	type: "folder" | "file";
	children?: any;
	id: string;
	setData: Dispatch<SetStateAction<any[]>>;
};

const FolderRecursiveComponent = ({
	name,
	type,
	children,
	id,
	setData,
}: propsType) => {
	return (
		<div>
			{type === "folder" ? (
				<Folder id={id} name={name} setData={setData} />
			) : (
				<File id={id} name={name} setData={setData} />
			)}
			{children?.length > 0 && (
				<div className="folder__children">
					{children.map((element: any) => (
						<FolderRecursiveComponent
							id={element._id}
							name={element.value}
							type={element.type}
							children={element.children}
							key={element._id}
							setData={setData}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default FolderRecursiveComponent;
