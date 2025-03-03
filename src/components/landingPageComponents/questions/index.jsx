
import Question from '../questionContainer';
import './questions.css';

const questions = [
    {
        question: `What does FrameFlow do?`,
        answer: `FrameFlow is an AI-powered video analysis platform that breaks down your video content, identifies its target audience, and provides storyboard-like visual suggestions to improve engagement and effectiveness.`
    },
    {
        question: `How does FrameFlow analyze my video?`,
        answer: `FrameFlow uses AI to analyze your video’s structure, pacing, and audience engagement potential. It then provides targeted recommendations for visuals, edits, and storytelling improvements to enhance viewer retention.`
    },
    {
        question: `What kind of video suggestions does FrameFlow provide?`,
        answer: `FrameFlow provides precise editing suggestions, detailing what to change on screen to enhance engagement and effectiveness. From cut placements to scene adjustments, it guides you on exact edits to make. Additional insights like framing, transitions, pacing, and engagement hooks further refine your video.`
    },
    {
        question: `Can FrameFlow resuggest video edits?`,
        answer: `Yes! With our Storyboard Resuggestion feature, you can click a button to have AI reanalyze a section of your video and provide a fresh, alternative visual recommendation.`
    },
    {
        question: `What does the Industry and Niche Analysis feature do?`,
        answer: `FrameFlow identifies the audience that your video naturally appeals to and suggests edits that better hook and retain that audience based on industry and niche insights.`
    },
    {
        question: `Does FrameFlow provide additional editing suggestions?`,
        answer: `Yes! Our Extra Suggestions feature offers AI-driven recommendations for SFX (sound effects), VFX (visual effects), camera techniques, audio adjustments, and music choices to complement your video’s storytelling.`
    },
    {
        question: `Will FrameFlow be subscription-based?`,
        answer: `We are finalizing our pricing model, but FrameFlow will use a credit-based system, allowing you to pay only for the video analyses and suggestions you need. This ensures flexibility and cost-effectiveness for all users.`
    },
    {
        question: `When will FrameFlow be available?`,
        answer: `FrameFlow is currently in development and will be launching soon. Stay updated by signing up for our waitlist and following us on social media!`
    },
]

const Questions = () => {
  return (
    <div id="faqs" className='questionsWrapper'>
        <h2 className="questionsheader">Questions Answered</h2>
        <div className="questionsSubWrapper">
            {questions?.map((question, i) => (
                <Question key={i} question={question} />
            ))}
        </div>
    </div>
  )
}

export default Questions