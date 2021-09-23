import React from "react";
import "./PersonCard.css";
import { motion } from "framer-motion";

const PersonCard = ({ data, deleteFunc, editFunc, openConnectionsFunc }) => {
  const { id, name, city, contactNo, photoUrl } = data;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pcard__container card mb-3"
    >
      <img src={photoUrl} className="card-img-top mt-2" alt="name" />
      <hr />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          I am from {city}.and you can can contact me on {contactNo}.
        </p>
        <button
          className="btn btn-primary btn-sm me-3"
          onClick={() => openConnectionsFunc(id)}
        >
          Connections
        </button>
        <button
          className="btn btn-outline-primary btn-sm me-3"
          onClick={() => editFunc(id)}
        >
          Update
        </button>
        <button
          className="btn btn-danger btn-sm "
          onClick={() => deleteFunc(id)}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default PersonCard;
