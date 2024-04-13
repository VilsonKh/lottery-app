import "./GameContent.scss";

import gameConfig from "../config/gameConfig.json";

import magicWand from "../assets/magic-wand.svg";
import NumberField from "../NumberField/NumberField";
import Button from "../Button/Button";
import { checkResultsAndSubmit } from "../utils/utils";

interface IGameContentProps {
	handleRandomButton: () => void;
	firstFieldSelections: number[];
	handleFirstFieldSelection: (selectedNumber: number) => void;
	secondFieldSelections: number[];
	handleSecondFieldSelection: (selectedNumber: number) => void;
	setIsWinner: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const GameContent = ({
	handleRandomButton,
	firstFieldSelections,
	handleFirstFieldSelection,
	secondFieldSelections,
	handleSecondFieldSelection,
	setIsWinner,
}: IGameContentProps) => {

	const { firstField, secondField} = gameConfig;
	const isResultButtonDisabled = firstFieldSelections.length < firstField.limit || secondFieldSelections.length < secondField.limit;
	
	return (
		<div className="gameContent">
			<button
				className="gameContent__randomButton"
				onClick={handleRandomButton}
			>
				<img
					src={magicWand}
					alt="magic wand"
				/>
			</button>
			<div className="field">
				<div className="field__header">
					<h3>Поле 1</h3>
					<p>
						Отметьте <span>{firstField.limit - firstFieldSelections.length}</span> чисел
					</p>
				</div>
				<NumberField
					selectLimit={firstField.limit}
					selectedNumbers={firstFieldSelections}
					min={firstField.startAt}
					max={firstField.endAt}
					onSelectNumber={handleFirstFieldSelection}
				/>
			</div>
			<div className="field">
				<div className="field__header">
					<h3>Поле 2</h3>
					<p>
						Отметьте <span>{secondField.limit - secondFieldSelections.length}</span> чисел
					</p>
				</div>
				<NumberField
					selectLimit={secondField.limit}
					selectedNumbers={secondFieldSelections}
					min={secondField.startAt}
					max={secondField.endAt}
					onSelectNumber={handleSecondFieldSelection}
				/>
			</div>
			<Button
				disabled={isResultButtonDisabled}
				onClick={() => checkResultsAndSubmit({ setIsWinner, firstFieldSelections, secondFieldSelections })}
				variant="contained"
				color="primary"
				size="large"
				children="Проверить"
			/>
		</div>
	);
};

export default GameContent;
