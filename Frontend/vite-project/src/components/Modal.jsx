// src/components/Modal.js
import React from "react";
import styles from "./Modal.module.css";
import { useEffect } from "react";

const Modal = ({ isOpen, onClose, onSave, currentItem }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Edit Item</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(currentItem);
            onClose();
          }}
        >
          <div className="space">
            <label>
              Name:
              <input
                className={styles.input}
                type="text"
                defaultValue={currentItem.fullname}
                onChange={(e) => (currentItem.fullname = e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                className={styles.input}
                type="text"
                defaultValue={currentItem.email}
                onChange={(e) => (currentItem.email = e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Mobileno:
              <input
                className={styles.input}
                type="text"
                defaultValue={currentItem.mobileno}
                onChange={(e) => (currentItem.mobileno = e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
