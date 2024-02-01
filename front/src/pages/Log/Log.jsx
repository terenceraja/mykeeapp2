import React from "react";
import "./Log.css";
import logo from "../../assets/myKeeApp.png";
import Form from "../../components/Form/Form";

const Log = () => {
  return (
    <div className="log_outlet">
      <div className="log_card">
        <section className="logo_section">
          <img src={logo} alt="logo" id="logo" />
          <h3>Welcome to myKeeApp</h3>
        </section>
        <Form />
      </div>
    </div>
  );
};

export default Log;
