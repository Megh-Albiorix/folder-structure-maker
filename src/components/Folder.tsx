import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import InputForm from "./InputForm";

const Folder = ({
	name,
	id,
	setData,
}: {
	name: string;
	id: string;
	setData: Dispatch<SetStateAction<any[]>>;
}) => {
	const [isActionInputVisible, setIsActionInputVisible] = useState(false);
	const [isInputForVisible, setIsInputVisible] = useState(false);

	const handleMouseEnter = () => {
		setIsActionInputVisible(true);
	};
	const handleMouseLeave = () => {
		if (isInputForVisible) return;
		setIsActionInputVisible(false);
	};

	const handleMinusClick = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		try {
			const res = await axios.delete(
				"https://folder-structure-api.onrender.com/" + id
			);
			await setData(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleAddClick = () => {
		setIsInputVisible(true);
	};

	return (
		<div
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="folder"
		>
			<div className="folder__details">
				<span className="folder__icon">
					<img
						src="./images/folder.png"
						alt="Folder Icon"
						className="folder__icon-img"
					/>
				</span>
				<span className="folder__name">{name}</span>
			</div>
			{isActionInputVisible && (
				<>
					<button
						onClick={handleMinusClick}
						className="folder__action-btn folder__action-btn--minus"
					>
						<img src="./images/minus.png" alt="Minus Icon" />
					</button>
					<button
						onClick={handleAddClick}
						className="folder__action-btn folder__action-btn--plus"
					>
						<img src="./images/plus.png" alt="Plus Icon" />
					</button>
				</>
			)}

			{isInputForVisible && (
				<InputForm
					id={id}
					setData={setData}
					onCloseClick={() => {
						setIsInputVisible(false);
						setIsActionInputVisible(false);
					}}
				/>
			)}
		</div>
	);
};

export default Folder;
