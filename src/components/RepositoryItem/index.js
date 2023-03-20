// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryData} = props
  const {imageUrl, starsCount, forksCount, issuesCount, name} = repositoryData

  return (
    <li className="repository-list-container">
      <img src={imageUrl} alt={name} className="image-element" />
      <h1 className="heading">{name}</h1>
      <div className="review-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="review-img"
        />
        <p className="review-element">{starsCount}</p>
      </div>
      <div className="review-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="review-img"
        />
        <p className="review-element">{forksCount}</p>
      </div>
      <div className="review-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="review-img"
        />
        <p className="review-element">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
