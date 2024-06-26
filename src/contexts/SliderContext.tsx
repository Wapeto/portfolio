import React, {createContext, useContext, useState} from 'react';

export interface SliderState {
    featured: number; // 0 for "School", 1 for "Personal"
    future: number;   // 0 for "Drafts", 1 for "Concepts"
}

interface SliderContextType {
    sliderState: SliderState;
    setSliderState: (newState: (prevState: SliderState) => SliderState) => void;
}

const SliderContext = createContext<SliderContextType | undefined>(undefined);

interface SliderProviderProps {
    children: React.ReactNode;
}

export const SliderProvider: React.FC<SliderProviderProps> = ({children}) => {
    const [sliderState, setSliderState] = useState<SliderState>({featured: 0, future: 0});

    // const handleSetSliderState = (newState: Partial<SliderState>) => {
    //     setSliderState(prev => ({...prev, ...newState}));
    // };

    return (
        <SliderContext.Provider value={{sliderState, setSliderState}}>
            {children}
        </SliderContext.Provider>
    );
};

export const useSlider = () => {
    const context = useContext(SliderContext);
    if (!context) {
        throw new Error('useSlider must be used within a SliderProvider');
    }
    return context;
};