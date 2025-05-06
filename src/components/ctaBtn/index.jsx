import Image from "next/image";
import "./ctaBtn.css";

const CTABtn = ({ text = "Get StoryCraft" }) => {
  return (
    <div className="ctaBtn">
      <Image
        src={"/images/pen.png"}
        width={50}
        height={50}
        alt="pen"
        className="pen"
      />
      {text}
    </div>
  );
};

export default CTABtn;
