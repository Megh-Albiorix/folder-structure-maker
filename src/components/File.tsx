import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

const File = ({
	name,
	id,
	setData,
}: {
	name: string;
	id: string;
	setData: Dispatch<SetStateAction<any[]>>;
}) => {
	const [isActionInputVisible, setIsActionInputVisible] = useState(false);

	const handleMouseEnter = () => {
		setIsActionInputVisible(true);
	};
	const handleMouseLeave = () => {
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

	return (
		<div
			className="file"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="file__details">
				<span className="file__icon">
					<img
						src="/public/images/file.png"
						alt="File Icon"
						className="file__icon-img"
					/>
				</span>
				<span className="file__name">{name}</span>
			</div>
			{isActionInputVisible && (
				<button
					onClick={handleMinusClick}
					className="folder__action-btn folder__action-btn--minus"
				>
					<img src="/public/images/minus.png" alt="Minus Icon" />
				</button>
			)}
		</div>
	);
};

export default File;
