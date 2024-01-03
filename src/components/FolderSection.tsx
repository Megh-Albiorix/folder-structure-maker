import { useEffect, useState } from "react";
import AddRootBtn from "./AddRootBtn";
import InputForm from "./InputForm";
import axios from "axios";
import FolderRecursiveComponent from "./FolderRecursiveComponent";

const FolderSection = () => {
	const [data, setData] = useState<any[]>([]);
	const [isInputVisible, setIsInputVisible] = useState(false);

	const handleAddRootClick = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		setIsInputVisible((prev) => !prev);
	};

	const getData = async () => {
		try {
			const res = await axios.get("https://folder-structure-api.onrender.com/");
			await setData(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="folder-section">
			<AddRootBtn onClick={handleAddRootClick} />
			{isInputVisible && (
				<InputForm
					setData={setData}
					onCloseClick={() => setIsInputVisible(false)}
				/>
			)}

			{data.map((element) => (
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
	);
};

export default FolderSection;
