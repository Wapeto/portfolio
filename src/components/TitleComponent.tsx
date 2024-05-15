import React, { useEffect } from 'react';

const TitleComponent: React.FC = () => {

    useEffect(() => {
        const handleScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollFraction = window.scrollY / maxScroll;
            const scrollAnimationTiming = scrollFraction * 4;  // Scale the scroll fraction for the animation duration

            // Apply the CSS custom property directly to the root element
            document.documentElement.style.setProperty('--scroll', scrollAnimationTiming.toString());
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="title-container">
            <h1 className="title">WAPETO</h1>
            <h2><strong>Hey there !</strong> I’m a student web developer based in Strasbourg - France</h2>
        </div>
    );
};

export default TitleComponent;
