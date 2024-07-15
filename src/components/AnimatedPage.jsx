import React from 'react';
import { motion } from 'framer-motion';

const AnimatedPage = ({ children }) => {
    const pageVariants = {
        initial: { opacity: 0  },
        animate: { opacity: 1 },
        exit: { opacity: 0 } // Adjusted to slide out
    };

    const pageTransition = {
        type: "tween",
        ease: "linear",
        duration: 1
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedPage;
