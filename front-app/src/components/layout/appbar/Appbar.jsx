import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useQuery } from "./../../../hooks";
import searchLogo from "./../../../assets/ic_Search.png";
import logo from "./../../../assets/Logo_ML.png";
import "./Appbar.scss";

export const Appbar = () => {
  const query = useQuery();
  const search = query.get("search");
  const [queu, setQueu] = useState("");
  const handleChangeInput = (e) => {
    setQueu(e.target.value);
  };
  const navigate = useNavigate();

  const handleSubmit  = (e) => {
    e.preventDefault();
      navigate(`/items?search=${queu}`);
  };
  useEffect(() => {
    setQueu(search || "")
  }, [search])
  
  return (
      <header className="appbar">
        <div className="appbar-container">
          <div className="appbar-logo">
            <a href="/" aria-label="Go to homepage">
            <img src={logo} alt="Logo Meli" title="Ir a menu" role="img" loading="lazy"/>
            </a>
          </div>
          <form role="search" className="appbar-search" onSubmit={handleSubmit}>
            <input
              value={queu}
              onChange={handleChangeInput}
              type="text"
              className="search-input"
              placeholder="Buscar productos, marcas y más..."
            />
            <button type="submit" className="search-button" aria-label="Buscar" title={`Buscar ${queu}`}>
              <img src={searchLogo} alt="Buscar" title={`Buscar ${queu}`} role="img" loading="lazy"/>
            </button>
          </form>
        </div>
      </header>

  );
};

export default Appbar;
