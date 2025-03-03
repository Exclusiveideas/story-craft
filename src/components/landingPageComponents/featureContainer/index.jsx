
import './featureContainer.css';

const FeatureContainer = ({ Icon, title, description }) => {
  return (
    <div className='featureContainer_wrapper'>
        <Icon />
        <h3 className="featureTitle">{title}</h3>
        <p className="featureDesc">{description}</p>
    </div>
  )
}

export default FeatureContainer