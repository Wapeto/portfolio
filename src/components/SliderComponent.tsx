import React from 'react';
import { useSlider, SliderState } from './SliderContext';

interface SliderComponentProps {
    stateA: string;
    stateB: string;
    type: keyof SliderState; // "featured" or "future"
}

const SliderComponent: React.FC<SliderComponentProps> = ({ stateA, stateB, type }) => {
    const { sliderState, setSliderState } = useSlider();

    const handleClick = (index: number) => {
        setSliderState(prevState => ({...prevState, [type]: index}));
        // console.log(`The slider state for ${type} is now ${index == 0 ? stateA : stateB}`);
    };

    return (
        <div className={`slider ${type}`}>
            <button className={`slider-part ${sliderState[type] === 0 ? 'active' : ''}`}
                    onClick={() => handleClick(0)}>
                {stateA}
            </button>
            <button className={`slider-part ${sliderState[type] === 1 ? 'active' : ''}`}
                    onClick={() => handleClick(1)}>
                {stateB}
            </button>
        </div>
    );
};

export default SliderComponent;
