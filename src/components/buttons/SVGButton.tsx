import {Link} from "react-router-dom";
import React from "react";

interface SVGButtonProps {
    text: string;
    SvgIcon: React.FC;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit';
    to?: string;
}

const SVGButton: React.FC<SVGButtonProps> = ({
                                                 text,
                                                 SvgIcon,
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
            <SvgIcon />
        </button>
    );

    return (
        <div className={`svg-button ${className}`}>
            {to ? <Link to={to}>{buttonContent}</Link> : buttonContent}
        </div>
    );
}

export default SVGButton;