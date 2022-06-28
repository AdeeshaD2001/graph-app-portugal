import React, { useState } from "react";
import "./search.styles.scss";
import Logo from "./logo.svg";

const Search = ({ handleLogout, handleSubmit }) => {
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
        <label htmlFor="chain-select">Choose a Chain</label>
        <input list="chain-list" id="chain-select-input" name="selectedChain" />
        <datalist id="chain-list"></datalist>
        <div className="submit-container">
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
