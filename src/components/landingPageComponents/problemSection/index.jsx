import Image from "next/image";
import "./problemSection.css";
const ProblemSection = () => {
  return ( 
    <div className="problemSect-wrapper">
      <h2 className="agitatorHeader">
        Tired of Spendig Hours Editing a Single Video
      </h2>
      <div className="withorWithout-wrapper">
        <div className="with-container">
          <h4 className="withHeader">Editing Without FrameFlow</h4>
          <div className="container-bullets">
            <p className="withBullet">Waste Hours editing a single video</p>
            <p className="withBullet">Headaches over deciding on what to add</p>
            <p className="withBullet">Taking on a few projects at a time</p>
            <p className="withBullet">
              Having a disorganized creative process in your editing
            </p>
          </div>
        </div>
        <div className="with-container with">
          <h4 className="withHeader">Editing With FrameFlow</h4>
          <div className="container-bullets">
            <p className="withBullet">
              Spend a lot less time edting your videos
            </p>
            <p className="withBullet">
              Knowing what to do on demand - no creatve blocks
            </p>
            <p className="withBullet">
              Ability to take on more projects at a time
            </p>
            <p className="withBullet">
              Equipped with an organized creative process in your editing
            </p>
          </div>
        </div>
      </div>

      <div className="testimonial-container">
        <div className="single-tesimonial-container">
          <p className="testimonialmessage">"I'd pay more for a software that cuts my editing time.”</p>
          <div className="testimonial-author">
            <Image
              src="/first-girl.png"
              width={50}
              height={50}
              alt="Picture of the author"
              className="authorImg"
            />
            <div className="nameRole">
              <p className="name">Aminat Jimoh</p>
              <p className="role">Freelance Video Editor on X</p>
            </div>
          </div>
        </div>
        <div className="single-tesimonial-container">
          <p className="testimonialmessage">"The idea of frameflow is appealing. Being able to work on 3 projects with the time of one. Can't wait for launch”</p>
          <div className="testimonial-author">
            <Image
              src="/second.png"
              width={50}
              height={50}
              alt="Picture of the author"
              className="authorImg"
            />
            <div className="nameRole">
              <p className="name">Adedeji Banjo</p>
              <p className="role">Freelance Video Editor on Upwork</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSection;
