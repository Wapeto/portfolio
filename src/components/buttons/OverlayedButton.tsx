import React from "react";
import { Link } from "react-router-dom";
import "../../scss/components/OverlayedButton.scss";

interface OverlayedButtonProps {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit';
    to?: string;
}

const OverlayedButton: React.FC<OverlayedButtonProps> = ({
                                                             text,
                                                             onClick,
                                                             disabled,
                                                             className,
                                                             type = 'button',
                                                             to
                                                         }) => {
    const buttonContent = (
        <button
            onClick={type === 'button' ? onClick : undefined}
            disabled={disabled}
            type={type}
        >
            {text}
        </button>
    );

    return (
        <div className={`overlayed-button ${className}`}>
            {to ? <Link to={to}>{buttonContent}</Link> : buttonContent}
            <div className="overlay"></div>
        </div>
    );
}

export default OverlayedButton;
