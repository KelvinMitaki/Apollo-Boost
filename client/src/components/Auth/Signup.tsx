import React from "react";

const Signup = () => {
  return (
    <div className="App">
      <h2 className="App">Signup</h2>
      <form className="form">
        <input type="text" name="username" placeholder="Username" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <button type="submit" className="button-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
