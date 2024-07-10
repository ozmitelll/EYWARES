import { useState, useEffect } from 'react';

export const useScrollAnimation = () => {
    const [style, setStyle] = useState({});

    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset;
            const height = window.innerHeight;
            const width = window.innerWidth;
            const scrolled = position / height;

            console.log(position)
            let translateY = scrolled * height;
            let translateX = 0;
            let scale = 1;

            if (position <= height) {
                translateX = width / 2.5 * (position / height);
                if(width >=768 && width <=1023) {
                    scale = (position/height)
                } else {
                    scale = 1 + 2 * (position / height);
                }

            } else if (position <= 2 * height) {
                console.log('here')
                if(width >=768 && width <=1023) {
                    translateX = width / 1.9 * (position / height) - (width * (position - height) / height) * 1.2;
                    scale = 3 - (position / height) / 1.4;
                } else {
                    translateX = width / 2.5 * (position / height) - (width * (position - height) / height) * 1.2;
                    scale = 3 - (position / height) / 5;
                }

            } else if (position <= 3.2 * height) {
                if(width >= 768 && width<=1023) {
                    translateX = width / 4 * (position / height) - (width * (position - height) / height) * 1.2 + (width * (position - 2 * height) / height) * 1.2;
                } else {
                    translateX = width / 2.7 * (position / height) - (width * (position - height) / height) * 1.2 + (width * (position - 2 * height) / height) * 1.2;
                }
                scale = 2.6 + (position / height - 2) * 2;
            } else if (position > 3 * height) {
                translateX = -0.258631578947643;
                scale = 2.6 + (position / height - 2) * 5;
            }

            setStyle({
                transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
                transition: 'transform 0.1s ease-out',
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return style;
};
