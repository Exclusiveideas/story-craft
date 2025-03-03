"use client";

import SignupForm from "../signUpForm";
import "./waitlistSection.css";

const WaitlistSection = () => {

  return (
    <div className="waitlistWrapper">
      <div className="bgContainer">
      </div>
      <h3 className="waitlistHeader">Sign Up to Waitlist</h3>
      <SignupForm />
    </div> 
  );
};

export default WaitlistSection;
