import SelectedDomainInfo from "./SelectedDomainInfo/SelectedDomainInfo"
import './mainSide.css'
import Groups from "./Groups/Groups"

const MainSide = () => {
    return(
      <div className="main-side">
        <SelectedDomainInfo />
        <Groups />
        <Groups />
        <Groups />
        <Groups />
      </div>
    )
  }

  export default MainSide