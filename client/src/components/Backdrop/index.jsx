import { motion } from "framer-motion";
import Confetti from 'react-confetti';
import { useState, useEffect } from "react";


const Backdrop = ({ children, onClick }) => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    function handleWindowSize() {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    useEffect(() => {
        window.onresize = () => handleWindowSize();
    });

    return (
        <motion.div
            className="backdrop"
            onClick={onClick}
            intitial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            width={windowSize.width} 
            height={windowSize.height}
        >
            <Confetti width={windowSize.width} height={windowSize.height} />
            {children}
        </motion.div>
    );
};

export default Backdrop;
