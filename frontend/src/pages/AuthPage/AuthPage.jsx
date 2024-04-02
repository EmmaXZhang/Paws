/* eslint-disable react/prop-types */
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LogInForm/LogInForm";
import { useState } from "react";

export default function AuthPage({ setUser }) {
  const [showLogInForm, setShowLogInForm] = useState(false);

  function handleSwitchForm() {
    setShowLogInForm(!showLogInForm);
  }

  return (
    <>
      <h1>AuthPage</h1>
      {showLogInForm ? (
        <>
          <LoginForm setUser={setUser} />
          <p>
            Don&apos;t have account ?
            <button onClick={handleSwitchForm}>Switch to SignUp</button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm setUser={setUser} />
          <p>
            Already have an account{" "}
            <button onClick={handleSwitchForm}>Switch to SignIn</button>
          </p>
        </>
      )}
    </>
  );
}
