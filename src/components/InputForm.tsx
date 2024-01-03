import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

type propsType = {
	setData: Dispatch<SetStateAction<any[]>>;
	onCloseClick: any;
	id?: string;
};

const InputForm = ({ setData, onCloseClick, id }: propsType) => {
	const [name, setName] = useState("");
	const [selectedType, setSelectedType] = useState("folder");

	const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedType(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
		if (name === "") return;
		e.preventDefault();
		if (!id) {
			try {
				const res = await axios.post(
					"https://folder-structure-api.onrender.com/initialize-root",
					{
						value: name,
					}
				);
				await setData(res.data);
				onCloseClick();
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				const res = await axios.post(
					"https://folder-structure-api.onrender.com/",
					{
						value: name,
						type: selectedType,
						parent: id,
					}
				);
				await setData(res.data);
				onCloseClick();
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			<div className="form__group">
				<input
					className="form__input"
					type="text"
					placeholder="Enter Name of Your Folder/File"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<button className="form__btn" type="submit">
					✅
				</button>
				<button onClick={onCloseClick} className="form__btn" type="button">
					❌
				</button>
			</div>
			{id && (
				<div className="form__radio-group">
					<label className="form__radio-label">
						<input
							type="radio"
							name="type-radio"
							value="folder"
							checked={selectedType === "folder"}
							onChange={handleOptionChange}
							className="form__radio-input"
						/>
						Folder
					</label>
					<label className="form__radio-label">
						<input
							type="radio"
							name="type-radio"
							value="file"
							checked={selectedType === "file"}
							onChange={handleOptionChange}
							className="form__radio-input"
						/>
						File
					</label>
				</div>
			)}
		</form>
	);
};

export default InputForm;
