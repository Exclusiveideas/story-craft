import Image from "next/image";
import "./mockup.css";

const MockupSection = () => {
  return (
    <div className="mockupWrapper">
      <h2 className="title">mockup</h2>
      <div className="innerWrapper">
      <Image
        src="/mockup-1.png"
        width={1000}
        height={1000}
        alt="product mockup"
        className="mockupImg one"
      />
      <Image
        src="/mockup-2.png" 
        width={1000}
        height={1000}
        alt="product mockup"
        className="mockupImg two"
      />
      <Image
        src="/mockup-3.png"
        width={1000}
        height={1000}
        alt="product mockup"
        className="mockupImg three"
      />
      <Image
        src="/mockup-4.png"
        width={1000}
        height={1000}
        alt="product mockup"
        className="mockupImg four"
      />
    </div></div>
  );
};

export default MockupSection;
