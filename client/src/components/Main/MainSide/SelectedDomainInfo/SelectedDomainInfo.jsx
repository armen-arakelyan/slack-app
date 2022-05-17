import './selectedDomainInfo.css'
import { useSelector } from 'react-redux'

const SelectedDomainInfo = () => {
  const userData = useSelector(state => state.userData)
  return(
    <div className="info">
      <div>
        <h2 className="domain-name">Domain Name</h2>
        <h4 className="user-name">{userData.name}</h4>
      </div>
      <div className="add-div">+</div>
    </div>
  )
}

export default SelectedDomainInfo