import React from 'react';
import ReactDOM from 'react-dom/client'; 
import '../src/assets/styles/style.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'tiny-slider/dist/tiny-slider.css'; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
