import React, {ButtonHTMLAttributes, FC, MouseEventHandler} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

const Button: FC<ButtonProps> = (props) => {
    const { children, onClick, className } = props;

    return (
        <button
            {...props}
            onClick={onClick}
            className={className}
        >
            {children}
        </button>
    );
};

Button.defaultProps = {
    className: "btn btn-primary",
};

export default Button;