import "./Button.scss"

type ButtonVariant = "contained" | "outlined";
type ButtonColor = "primary" | "secondary";
type buttonSize = "standart" | "large"

interface IButtonProps {
	variant: ButtonVariant;
	color: ButtonColor;
	size: buttonSize;
	disabled?: boolean;
	onClick: (event?: any) => void;
	children: string;
}

const Button: React.FC<IButtonProps> = ({ variant, color, size, disabled=false, onClick, children }) => {

	const className = `button ${variant} ${color} ${size}`

	return <button className={className} disabled={disabled} onClick={onClick}>{children}</button>;
};

export default Button;
