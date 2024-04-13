import gameConfig from "../config/gameConfig.json";

const { firstField, secondField } = gameConfig;

/**
 * Generates an array of unique random numbers within a specified range.
 *
 * @param {number} min - the minimum value of the range
 * @param {number} max - the maximum value of the range
 * @param {number} count - the number of random numbers to generate
 * @return {number[]} an array of unique random numbers
 */
export function generateRandomNumbers(min: number, max: number, count: number): number[] {
	const numbers = new Set<number>();
	while (numbers.size < count) {
		const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		numbers.add(randomNumber);
	}
	return Array.from(numbers);
}

export interface ICheckResultsProps {
	setIsWinner: (value: boolean) => void;
	firstFieldSelections: number[];
	secondFieldSelections: number[];
}

/**
 * Check the results of the user selections and submit the data to the server.
 *
 * @param {ICheckResultsProps} setIsWinner - Function to set whether the user is a winner
 * @param {number[]} firstFieldSelections - Array of numbers selected in the first field
 * @param {number[]} secondFieldSelections - Array of numbers selected in the second field
 * @return {void} No return value
 */
export const checkResultsAndSubmit = ({ setIsWinner, firstFieldSelections, secondFieldSelections }: ICheckResultsProps) => {
	const firstFieldNumbers = generateRandomNumbers(firstField.startAt, firstField.endAt, firstField.limit);
	const secondFieldNumbers = generateRandomNumbers(secondField.startAt, secondField.endAt, secondField.limit);

	const minTotalMatchesRule = firstField.minMatches + secondField.minMatches;

	const matchesFirstField = firstFieldSelections.filter((num) => firstFieldNumbers.includes(num)).length;
	const matchesSecondField = secondFieldSelections.filter((num) => secondFieldNumbers.includes(num)).length;

	const totalMatches = matchesFirstField + matchesSecondField;

	const isWinner =
		totalMatches >= minTotalMatchesRule && matchesFirstField >= firstField.minMatches && matchesSecondField >= secondField.minMatches;

	setIsWinner(isWinner);

	const sendingData = {
		selectedNumber: {
			firstField: firstFieldSelections,
			secondField: secondFieldSelections,
		},
		isTicketWone: isWinner,
	};
	

	sendDataToServer( sendingData, "https://fakeapi.com/posts", 3, 2000);
};

export interface IResetGame {
	setIsWinner: (value: null) => void;
	setFirstFieldSelections: (value: number[]) => void;
	setSecondFieldSelections: (value: number[]) => void;
}

export const resetGame = ({ setIsWinner, setFirstFieldSelections, setSecondFieldSelections }: IResetGame) => {
	setIsWinner(null);
	setFirstFieldSelections([]);
	setSecondFieldSelections([]);
};

export interface LotteryData {
	selectedNumber: {
		firstField: number[];
		secondField: number[];
	};
	isTicketWone: boolean;
}

export const sendDataToServer = async (data: LotteryData, url: string, retries = 2, interval = 2000) => {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			console.log("Data sent successfully:", data);
		} else {
			if (retries > 0) {
				console.error("Server responded with an error, retrying in " + interval + "ms");
				setTimeout(() => sendDataToServer(data, url, retries - 1, interval), interval);
			} else {
				console.error("All retries failed, please check the network connection.");
			}
		}
	} catch (error) {
		console.error("An error occurred:", error);
	}
};
