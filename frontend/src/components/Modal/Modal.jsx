import { motion } from "framer-motion";
import React from "react";
import "./Modal.css";

const Modal = ({ open, children }) => {
  return open ? (
    <>
      {" "}
      <div className="modal__shadow"></div>
      <div id="sam" className="modal__container">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 10 }}
          exit={{ opacity: 0, y: 0 }}
        >
          {children}
        </motion.div>
      </div>
    </>
  ) : (
    <div></div>
  );
};

export default Modal;
