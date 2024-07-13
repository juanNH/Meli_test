import PropTypes from 'prop-types'
import './Appbar.scss';
import searchLogo from'./../../../assets/ic_Search.png';
import logo from'./../../../assets/Logo_ML.png';

export const Appbar = ({children}) => {

    //#FFE600
  return (
    <>
    <header className="appbar">
      <div className="appbar-container">
        <div className="appbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="appbar-search">
          <input type="text" className="search-input" placeholder="Buscar productos, marcas y más..." />
          <button className="search-button">
            <img src={searchLogo} alt="Buscar" />
          </button>
        </div>
      </div>
    </header>
    
    {children}
    </>
  )
}
Appbar.propTypes = {
  children:PropTypes.node
}

export default Appbar
