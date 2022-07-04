import React, { useState } from "react";
import "./search.styles.scss";
import Logo from "./logo.svg";

const Search = (props) => {

  const {switchGraphMode, isScatter, handleLogout, handleSubmit } = props;
  

  const switchModeUp = () => {
    switchGraphMode();
  }



  return (
    <div className="search">
      <div className="title">
        <div>
          <img className="logo" src={Logo} alt="Logo Deep Ambiente" />
        </div>
        <div></div>
        <div className="button-tab">
          <button onClick={handleLogout}>Sair</button>
        </div>
      </div>
      <div className="chain-select-container">
        <label htmlFor="chain-select" id="choose-chain-label">Choose a Chain</label>
        <input list="chain-list" id="chain-select-input" name="selectedChain" />
        
        <div className="datalist-wrapper">
          <datalist id="chain-list"></datalist>
        </div>
        
        <div className="submit-container">
          <button type="button" className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
          <button type="button" className="switch-btn"onClick={switchModeUp}>
            Switch Graph Mode
          </button> 
        </div>
        
      </div>
    </div>
  );
};

export default Search;
