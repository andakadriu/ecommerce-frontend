import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../assets/styles/style.css";
const WhatsAppButton = () => {
  const phoneNumber = "+38349649828"; 
  const message = encodeURIComponent("Hello! I need some assistance.");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp className="whatsapp-icon" />
    </a>
  );
};

export default WhatsAppButton;
