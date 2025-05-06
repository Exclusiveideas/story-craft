"use client";

import Navbar from "@/components/navbar";
import "./heroSection.css";
import CTABtn from "@/components/ctaBtn";
import { Gift } from "lucide-react";

const HeroSection = () => {
  return (
    <div id="hero" className="heroWrapper">
      <Navbar />
      <div className="heroBodyWrapper left">
        <div className="heroBody_subWrapper">
          <h2 className="heroWord">
            Plan Better Video Scripts, <span>5x Faster</span>
          </h2>
          <p className="herotagline">
            Describe your video. We handle the structure, research, and flow -
            visually mapped in minutes without the overwhelm.
          </p>
          <div className="fomoContainer">
            <CTABtn />
            <div className="fomo_wrapper">
              <Gift className="gift" />
              <p>
                <span>Early access pricing</span> ends after 100 users — 18
                spots remaining.
              </p>
            </div>
          </div>
          <div className="heroFomo_container"></div>
        </div>
        <div className="heroBody_subWrapper"></div>
      </div>
    </div>
  );
};

export default HeroSection;
