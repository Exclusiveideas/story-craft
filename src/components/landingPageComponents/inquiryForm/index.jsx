import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./inquiryForm.css";

const InquiryForm = () => {
  const [state, handleSubmit] = useForm("mnnjzpoo"); // Replace with your Formspree ID
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setSuccessMessage(true);
    }
  }, [state.succeeded]);

  const handleInputFocus = () => {
    setSuccessMessage(false);
  };

  return (
    <div id="contact" className="inquiryForm_wrapper">
      <h2 className="inquiryHeader">Have a Different Question?</h2>
      <p className="inquirySubHeader">
        I will answer all your questions personally and help you get started
        with FrameFlow!
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg"
      >
        <label htmlFor="name" className="block font-semibold mb-1">
          Your Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className="w-full p-2 border rounded mb-4"
          onFocus={handleInputFocus}
        />

        <label htmlFor="email" className="block font-semibold mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full p-2 border rounded mb-4"
          onFocus={handleInputFocus}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        <label htmlFor="message" className="block font-semibold mb-1">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="w-full p-2 border rounded mb-4"
          onFocus={handleInputFocus}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full text-white p-2 rounded hover:bg-blue-600 transition btn"
        >
          {state.submitting ? "Sending..." : "Send Inquiry"}
        </button>

        {successMessage && (
          <p className="w-full text-center p-6 text-green-500 shadow-lg rounded-lg">
            Thanks for your inquiry! We’ll get back to you soon.
          </p>
        )}
      </form>
    </div>
  );
};

export default InquiryForm;
