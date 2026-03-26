import React from "react";
import { Modal } from "../../ui";

const ResumeModal = ({ imageUrl, onClose }) => (
  <Modal onClose={onClose}>
    <img src={imageUrl} alt="resume" style={{ maxWidth: "500px", height: "auto" }} />
  </Modal>
);

export default ResumeModal;
