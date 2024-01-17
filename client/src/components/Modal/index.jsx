import { motion } from "framer-motion";
import Backdrop from "../Backdrop";
import './Modal.css';
import { Button } from '@mui/material'


const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
}

const ModalText = ({ text }) => (
    <div className="modal-text">
      <h3>{text}</h3>
      <h1 style={{ marginBottom: "0"}}>
        Congratulations!
      </h1>
    </div>
  );

const Modal = ({ handleClose, text }) => {
    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <ModalText text={text} />
                <h2>You have completed your goal!</h2>
                <label>Click anywhere outside the box to exit</label>
            </motion.div>
        </Backdrop>
    );
};

export default Modal;