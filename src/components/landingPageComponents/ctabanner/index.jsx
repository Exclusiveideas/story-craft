import './ctabanner.css';

const CTABanner = () => {
  return (
    <div id="invest" className='ctaBanner'>
        <h1 className="bannerHeader">Want to see our Investor Pitch Deck?</h1>
        <p className="bannerDesc">We’re raising our pre-seed round—take a look and see why FrameFlow is the next big thing in AI-powered video editing!</p>
        <a href="https://docs.google.com/presentation/d/1AY_qWQlU8dUyx8VmInA4NNOpb3AtCmzHEVVtGl4yXSg/" target="_blank" rel="noopener noreferrer"><button className="bannerBtn">View Pitch Deck</button></a>
    </div>
  )
}

export default CTABanner