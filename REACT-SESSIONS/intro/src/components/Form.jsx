import React, { useState } from "react";

const Form = () => {
  const [nameInput, setNameInput] = useState("");
  const [name, setName] = useState("");

  const [emailInput, setEmailInput] = useState("");
  const [email, setEmail] = useState("");

  const nameChangeHandler = (e) => {
    var nameText = e.target.value;
    setNameInput(nameText);
  };
  const emailChangeHandler = (e) => {
    var emailText = e.target.value;
    setEmailInput(emailText);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setName(nameInput);
    setEmail(emailInput);
  };

  // nameText => nameInput => name
  // emailText => emailInput => email

  return (
    <div>
      <h1>{name}</h1>
      <p>{email}</p>
      <form onSubmit={submitHandler}>
        <input
          onChange={nameChangeHandler}
          type="text"
          placeholder="enter name ..."
        />
        <input
          onChange={emailChangeHandler}
          type="email"
          placeholder="enter email ..."
        />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Form;
