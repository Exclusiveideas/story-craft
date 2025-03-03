"use client";

import SignupForm from "../landingPageComponents/signUpForm";
import "./heroSection.css";

const HeroSection = () => {


  return (
    <div id="hero" className="heroWrapper">
      <p className="herotagline">
        Sign up for Early Access and get 100% Free Storyboards for 2 Project
      </p>
      <h2 className="heroWord">
        Edit Your Videos Faster <span className="ampersand"> & </span>Better
        With <br />
        AI-Powered Suggestion
      </h2>
      <p className="herotagline">
        Be equipped with industry and Niche Specific suggestions with
        <b> AI-Powered Video Analysis</b>
      </p>
      <p className="herotagline">
        Spend less time thinking and more time editing and earning, Sign Up Now!
      </p>
      <SignupForm />
    </div>
  );
};

export default HeroSection;
