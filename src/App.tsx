import { useState } from "react";
import Notification from "./Notification/Notification";
import { generateRandomNumbers } from "./utils/utils";

import gameConfig from "./config/gameConfig.json";

import "./App.scss";
import GameContent from "./GameContent/GameContent";

function App() {
	const [firstFieldSelections, setFirstFieldSelections] = useState<number[]>([]);
	const [secondFieldSelections, setSecondFieldSelections] = useState<number[]>([]);
	const [isWinner, setIsWinner] = useState<boolean | null>(null);

	const { firstField, secondField, messages } = gameConfig;

	const handleFirstFieldSelection = (number: number) => {
		setFirstFieldSelections((prev) => {
			if (prev.includes(number)) {
				return prev.filter((num) => num !== number);
			} else {
				return prev.length < firstField.limit ? [...prev, number] : prev;
			}
		});
	};

	const handleSecondFieldSelection = (number: number) => {
		setSecondFieldSelections((prev) => {
			if (prev.includes(number)) {
				return prev.filter((num) => num !== number);
			} else {
				return prev.length < secondField.limit ? [...prev, number] : prev;
			}
		});
	};

	const handleRandomButton = () => {
		setFirstFieldSelections(generateRandomNumbers(firstField.startAt, firstField.endAt, firstField.limit));
		setSecondFieldSelections(generateRandomNumbers(secondField.startAt, secondField.endAt, secondField.limit));
	};

	const NotificationProps = {
		setFirstFieldSelections,
		setSecondFieldSelections,
		setIsWinner,
		message: isWinner ? messages.win : messages.fail,
	};

	const GameContentProps = {
		handleRandomButton,
		firstFieldSelections,
		handleFirstFieldSelection,
		secondFieldSelections,
		handleSecondFieldSelection,
		setIsWinner,
	};

	return (
		<div className="App">
			<h1>Lottery App</h1>
			<div className="gameHeader">
				<p className="gameHeader_title">Билет 1</p>
			</div>
			{isWinner !== null ? <Notification {...NotificationProps} /> : <GameContent {...GameContentProps} />}
		</div>
	);
}

export default App;
