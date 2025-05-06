import Image from "next/image";
import "./navbar.css";
import CTABtn from "../ctaBtn";

const navbarItems = ['Pricing', 'Demo', 'Reviews']

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logoWrapper">
        <Image
          src={"/images/logo.png"}
          width={120}
          height={120}
          alt="app logo"
          className="logo"
        />
        <h3 className="appName">StoryCraft</h3>
      </div>
      <div className="navbarItemsWrapper">
        {navbarItems?.map((item, i) => (
          <a href="#">
            <div key={i} className="navbarItem">
              <p>{item}</p>
              <hr className="navItemLine" />
            </div>
          </a>
        ))}
      </div>
      <div className="navCTAWrapper">
        <CTABtn />
      </div>
    </div>
  );
};

export default Navbar;
