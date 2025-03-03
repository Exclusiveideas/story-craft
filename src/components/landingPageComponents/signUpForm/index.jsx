"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import './signupForm.css';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    setMessage("");

    const payload = {
      email: e.target[0].value,
      waitlist_id: 24919, // Your Waitlist ID
      referral_link: window.location.href, // Capture current page URL
    };

    try {
      const response = await fetch(
        "https://api.getwaitlist.com/api/v1/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      console.log('response: ', response)

      if (response.ok) {
        setMessage(`Success! Your referral link: ${result.referral_link}`);
        reset(); // Reset form after success
      } else {
        setMessage(result.error || "Something went wrong. Try again.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="heroWaitlist_wrapper">
      <p className="joinText">Join 19 other Editors on the Waitlist !</p>
      <form className="waitlistForm" onSubmit={(e) => handleSubmit(onSubmit(e))}>
        <input
          name="email"
          type="email"
          placeholder="example@frameflow.com"
          required
          onFocus={() => setMessage('')}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Join Waitlist"}
        </button>
      </form>
      {message && (
        <p
          className={` ${
            message.startsWith("Success") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default SignupForm;
