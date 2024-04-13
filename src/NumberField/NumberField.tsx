import React from "react";
import "./NumberField.scss";

interface NubmerFieldProps {
	selectLimit: number;
	selectedNumbers: number[];
	min: number;
	max: number;
	onSelectNumber: (number: number) => void;
}

const NumberField: React.FC<NubmerFieldProps> = ({ selectedNumbers, min, max, onSelectNumber }) => {
	const handleSelect = (number: number) => {
   
		onSelectNumber(number);
	};

	const renderCells = () => {
		const cells = [];
		for (let i = min; i <= max; i++) {
			cells.push(
				<div
					key={i}
					className={`cell ${selectedNumbers.includes(i) ? "selected" : ""}`}
					onClick={() => handleSelect(i)}
				>
					{i}
				</div>
			);
		}
		return cells;
	};

	return <div className="number-field">{renderCells()}</div>;
};

export default NumberField;
