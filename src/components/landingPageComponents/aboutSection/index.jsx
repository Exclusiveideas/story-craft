import Image from "next/image";
import "./aboutSection.css";
import FeatureContainer from "../featureContainer";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import FactoryIcon from '@mui/icons-material/Factory';
import Filter9PlusIcon from '@mui/icons-material/Filter9Plus';
import AssistantIcon from '@mui/icons-material/Assistant';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';

const appFeatures = [
  {
    Icon: () => <EmojiObjectsIcon />,
    title: 'Video Analysis',
    desc: `Break down your video with AI-driven insights and receive unique storyboard-style visual suggestions. Enhance engagement with data-backed edits that make your content more compelling and effective.`
  },
  {
    Icon: () => <FactoryIcon />,
    title: ' Industry and Niche Analysis',
    desc: `AI-driven insights to analyze your video's audience and provide tailored content suggestions. Optimize engagement with edits that hook and resonate with your viewers.`
  },
  {
    Icon: () => <Filter9PlusIcon />,
    title: 'Storyboard Resuggestion',
    desc: `Need a fresh perspective? Click “Resuggest,” and our AI will reanalyze your video section, offering new visual directions to enhance storytelling.`
  },
  {
    Icon: () => <AssistantIcon />,
    title: 'Extra Suggestions',
    desc: `Beyond visuals—FrameFlow suggests SFX, VFX, camera angles, music, and audio enhancements to elevate your video’s impact effortlessly.`
  },
  {
    Icon: () => <InstallMobileIcon />,
    title: 'Mobile Ready',
    desc: `A fully responsive design optimized for every device. Upload, analyze, and optimize your videos on the go—seamlessly.`
  },
]

const AboutSection = () => {
  return (
    <div id="features" className="aboutSectWrapper">
      <div className="badgeWrapper">
        <h2 className="header">So, What is FrameFlow?</h2>
        <div className="description">
          <p>
            FrameFlow helps video editors edit faster by providing AI-powered
            visual suggestions generated by analyzing the{" "}
            <b>video, it's target audience and niche</b>, all with a click of a
            button.
          </p>
          <div className="cursorWrapper">
            <CursorIcon />
          </div>
        </div>
      </div>
      <div className="aboutSubSection">
        <h2 className="subHeader">AI-Powered Storyboards</h2>
        <p className="subDescription">
          Get niche-specific suggestions about your video and make{" "}
          <b>edits that move your audience and not cookie-cutter edits.</b>
        </p>
        <div className="previewMockup">
          <Image
            src="/images/app_preview.png"
            width={1000}
            height={1000}
            alt="product mockup"
            className="appPreview"
          />
        </div>
      </div>
      <div className="aboutSubSection">
        <h2 className="subHeader">Hold up, there's more !</h2>
        <div className="extrafeatures_wrapper">
          {appFeatures?.map((feature, i) => (
            <FeatureContainer key={i} Icon={feature?.Icon} title={feature?.title} description={feature?.desc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

const CursorIcon = ({ color = "#ffffff", size = 45 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0,0,256,256"
      width={size}
      height={size}
      fillRule="nonzero"
    >
      <g fill={color} stroke="none">
        <g transform="scale(4,4)">
          <path d="M14.16797,4c-0.55469,0 -1,0.44531 -1,1v2.07031c0,0.55469 0.44531,1 1,1c0.55078,0 1,-0.44531 1,-1v-2.07031c0,-0.55469 -0.44922,-1 -1,-1zM7.30469,6.42969c-0.25781,0 -0.51172,0.09766 -0.71094,0.29297c-0.39062,0.39063 -0.39062,1.02344 0,1.41406l1.46875,1.46484c0.19531,0.19531 0.44922,0.29297 0.70703,0.29297c0.25781,0 0.51172,-0.09766 0.70703,-0.29297c0.39063,-0.39062 0.39063,-1.02344 0,-1.41406l-1.46875,-1.46484c-0.19531,-0.19531 -0.44922,-0.29297 -0.70313,-0.29297zM21.03125,6.42969c-0.25781,0 -0.51172,0.09766 -0.70703,0.29297l-1.46875,1.46484c-0.39062,0.39063 -0.39062,1.02344 0,1.41406c0.19531,0.19531 0.45313,0.29297 0.70703,0.29297c0.25781,0 0.51172,-0.09766 0.70703,-0.29297l1.46484,-1.46484c0.39453,-0.39062 0.39453,-1.02344 0,-1.41406c-0.19531,-0.19531 -0.44922,-0.29297 -0.70312,-0.29297zM13.97656,11.83203c-0.57812,-0.05078 -1.14844,0.15625 -1.57812,0.58594c-0.57422,0.57422 -0.74609,1.39453 -0.44531,2.14844l16.07031,40.5c0.28516,0.71875 0.9375,1.19922 1.70703,1.25781c0.75781,0.05469 1.48438,-0.3125 1.875,-0.97656l6.73438,-11.39062l13.33984,13.34375c0.56641,0.56641 1.32031,0.88281 2.12109,0.88281c0.80469,0 1.55859,-0.3125 2.12109,-0.88281l1.41797,-1.41016c1.16797,-1.17187 1.16797,-3.07812 0,-4.24609l-13.33984,-13.33594l11.32422,-6.68359c0.66406,-0.39453 1.03906,-1.10937 0.98047,-1.87891c-0.05859,-0.76953 -0.54297,-1.41797 -1.25781,-1.70312l-40.49609,-16.07031c-0.1875,-0.07422 -0.38281,-0.12109 -0.57422,-0.14062z"></path>
        </g>
      </g>
    </svg>
  );
};
