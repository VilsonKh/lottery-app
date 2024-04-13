import React from "react";
import "./Notification.scss";
import Button from "../Button/Button";
import { resetGame } from "../utils/utils";
interface NotificationProps {
	message: string;
	setFirstFieldSelections: (value: number[]) => void;
	setSecondFieldSelections: (value: number[]) => void;
	setIsWinner: (value: null) => void;
}

const Notification: React.FC<NotificationProps> = ({ message, setFirstFieldSelections, setSecondFieldSelections, setIsWinner }) => {
	if (!message) {
		throw new Error("Message is missing");
	}

	return (
		<div className="notification">
			{message}
			<Button
				variant="contained"
				color="primary"
				size="large"
				onClick={() => resetGame({ setFirstFieldSelections, setSecondFieldSelections, setIsWinner })}
			>
				Попробовaть еще раз
			</Button>
		</div>
	);
};

export default Notification;
