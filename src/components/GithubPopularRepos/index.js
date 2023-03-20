import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoryData: [],
    activeId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {activeId} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`

    const response = await fetch(apiUrl)

    if (response.ok) {
      const fetchedData = await response.json()
      const formattedData = fetchedData.popular_repos.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.avatar_url,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
      }))
      this.setState({
        repositoryData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositoryView = () => {
    const {repositoryData} = this.state

    return (
      <ul className="repositories-container">
        {repositoryData.map(eachRepository => (
          <RepositoryItem
            key={eachRepository.id}
            repositoryData={eachRepository}
          />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-view">Something Went Wrong</h1>
    </div>
  )

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderLanguageDetails = () => {
    const {activeId} = this.state

    return (
      <ul className="languages-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            languagesItems={eachLanguage}
            updateActiveId={this.updateActiveId}
            isActive={eachLanguage.id === activeId}
          />
        ))}
      </ul>
    )
  }

  updateActiveId = newFilteredId => {
    this.setState({activeId: newFilteredId}, this.getData)
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        {this.renderLanguageDetails()}
        <hr className="h-line" />
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
