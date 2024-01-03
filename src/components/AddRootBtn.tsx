import { ReactEventHandler } from "react";

type propType = {
	onClick?: ReactEventHandler;
};

const AddRootBtn = ({ onClick }: propType) => {
	return (
		<button onClick={onClick} className="add-root-btn">
			Add Root Folder
		</button>
	);
};

export default AddRootBtn;
