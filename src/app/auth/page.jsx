"use client";

import { useState } from "react";
import "./auth.css";
import AuthFormCarousel from "@/components/authComponents/authFormCarousel";
import LoginForm from "@/components/authComponents/authForms/login";
import SignupForm from "@/components/authComponents/authForms/signupForm";
import RecoverPassword from "@/components/authComponents/authForms/recoverPass";

const Auth = () => {
  const [activeForm, setActiveForm] = useState("login"); // login, signup, recover
  return (
    <div className="authPage">
      <div className="auth_left_blob"></div>
      <div className="form_component">
        <div className="form_carousel_container">
          <AuthFormCarousel />
        </div>
        <div className="authForm_wrapper">
          {activeForm == "login" && (
            <h3 className="formTitle">Login to your account</h3>
          )}
          {activeForm == "signup" && (
            <h3 className="formTitle">Create an account</h3>
          )}
          {activeForm == "recover" && (
            <h3 className="formTitle">Reset your password</h3>
          )}
          {/*  */}
          {activeForm == "signup" && (
            <p className="subTxt">
              Already have an account?
              <span onClick={() => setActiveForm("login")}> log in</span>
            </p>
          )}
          {activeForm == "login" && (
            <p className="subTxt">
              Don't have an account?
              <span onClick={() => setActiveForm("signup")}> sign up</span>
            </p>
          )}
          {activeForm == "recover" && (
            <p className="subTxt">
              Go back to{" "}
              <span onClick={() => setActiveForm("login")}>login</span>
            </p>
          )}
          {/*  */}
          {activeForm == "login" && <LoginForm />}
          {activeForm == "signup" && <SignupForm />}
          {activeForm == "recover" && <RecoverPassword />}
          {/*  */}
          {activeForm == "login" && (
            <p className="subTxt">
              Forgot your password?{" "}
              <span onClick={() => setActiveForm("recover")}>recover it</span>
            </p>
          )}
        </div>
      </div>
      {/* <div className="bg_illustration">
        <Image
          src={`/images/lion.png`}
          width={300}
          height={300}
          alt="login Illustration"
          className="authIllustration one"
        />
        <Image
          src={`/images/abstract.png`}
          width={300}
          height={300}
          alt="login Illustration"
          className="authIllustration two"
        />
      </div> */}
    </div>
  );
};

export default Auth;
