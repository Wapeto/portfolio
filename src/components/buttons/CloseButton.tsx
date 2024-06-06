import React from 'react';
import CloseIcon from "../../assets/icons/CloseIcon.tsx";
import {CSSTransition} from 'react-transition-group';

interface ButtonProps {
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
}

const CloseButton: React.FC<ButtonProps> = ({expanded, setExpanded}) => {

    const nodeRef = React.useRef(null);
    // Get the current value of the expanded state

    return (
        <CSSTransition
            in={expanded}
            timeout={500}
            classNames="button"
            unmountOnExit
            nodeRef={nodeRef}>
            <button
                ref={nodeRef}
                className="close-button"
                onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(false);
                }}
                aria-label="Close"
            >
                <CloseIcon/>
            </button>

        </CSSTransition>
    );
};

export default CloseButton;