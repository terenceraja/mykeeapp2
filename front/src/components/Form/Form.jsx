import React from "react";
import "./Form.css";

// REACT
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

// HTTP
import { fetchId } from "../../utils/http";

// REDUCER
import { addIdCtraCliToStore } from "../../reducers/primaryKeys";

const Form = () => {
  // FETCH STATES
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  // FORM
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // POST FETCHING EXAMPLE
  const fetchDataFromServer = async () => {
    setIsFetching(true);

    try {
      const response = await fetchId(form);
      return response;
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };

  // INPUT ONCHANGE
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //HANDLE LOGIN CLICK
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetchDataFromServer();

    if (response.IdCtraCli) {
      console.log(response);
      dispatch(addIdCtraCliToStore(response.IdCtraCli));
      setTimeout(() => {
        navigate("layout/ptf");
      }, 1500);
    } else {
      setTimeout(() => {
        setIsFetching(false);
        setServerMessage(response.message);
      }, 1000);

      console.log(response);
    }
  };

  return (
    <form className="submit_section" onSubmit={(e) => handleLogin(e)}>
      <input
        onChange={(e) => handleOnChange(e)}
        type="text"
        placeholder="Login"
        name="login"
        required
        autoComplete="current-username"
      />
      <input
        onChange={(e) => handleOnChange(e)}
        type="password"
        placeholder="Password"
        name="password"
        required
        autoComplete="current-password"
      />
      <button id="loginBtn">LOGIN</button>
    </form>
  );
};

export default Form;
