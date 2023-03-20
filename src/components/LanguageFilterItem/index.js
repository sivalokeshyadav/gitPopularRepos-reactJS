// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languagesItems, updateActiveId, isActive} = props

  const {id, language} = languagesItems
  const onSelectItem = () => {
    updateActiveId(id)
  }
  const activeClassName = isActive ? 'active-btn' : 'normal-btn'

  return (
    <li>
      <button className={activeClassName} type="button" onClick={onSelectItem}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
