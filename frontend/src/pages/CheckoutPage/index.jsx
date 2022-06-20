import React, { useState } from "react";
import { useEffect } from "react";
import { getAllGraphs, updateSubscription } from "../../services/api";

const CheckoutPage = () => {
  const [user, setUser] = useState(null);
  const chainNames = [];
  let level = "";

  const getChains = async () => {
    let res = await getAllGraphs();
    return res.data;
  };

  const generateChainSelect = () => {
    let allChains = JSON.parse(localStorage.getItem("allChains"));
    let options = `<option value="''"></option>`;
    allChains.forEach((chain) => {
      options += `<option value="${chain.cadeia_nome}">${chain.cadeia_nome}</option>`;
    });
    document.querySelector("#chain-select").innerHTML = options;
  };

  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    const allChains = [];

    setUser(user);
    console.log(user);

    getChains().then((chains) => {
      chains.forEach((chain) => {
        allChains.push(chain);
      });
      console.log(allChains);
      localStorage.setItem("allChains", JSON.stringify(allChains));
      generateChainSelect();
    });
  }, []);

  const handleSubTypeSelect = () => {
    level = document.querySelector("#sub-type-select").value;
    console.log(level);
    let allChains = JSON.parse(localStorage.getItem("allChains"));
    while(chainNames.length > 0) {
      chainNames.pop();
    }
    if (level === "premium_level") {
      allChains.forEach((chain) => {
        chainNames.push(chain.cadeia_nome);
      });
      document.querySelector("#chain-select").style.display = "none";
    }else{
      document.querySelector("#chain-select").style.display = "block";
    }
  };

  const handleChainSelect = () => {
    

    if (
      level === "basic_level" ||
      level === "level_two" ||
      level === "level_three"
    ) {
      if (chainNames.length < 1) {
        chainNames.push(document.querySelector("#chain-select").value);
      } else {
        chainNames[0] = document.querySelector("#chain-select").value;
      }
    } else if (level === "level_four" || level === "level_five") {
      if (chainNames.length < 3) {
        chainNames.push(document.querySelector("#chain-select").value);
      } else {
        console.log("You can only select three chains");
      }
    } else {
    
    }

    console.log(chainNames);
  };

  const handleSubmit = () => {
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    let allChains = JSON.parse(localStorage.getItem("allChains"));
    let chosenChains = [];
    allChains.forEach(obj => {
      chainNames.forEach(chain =>{
         if (obj.cadeia_nome === chain){
          chosenChains.push(obj._id) 
      }
      })
     
    });
    console.log(user.id);
    console.log(level);
    console.log(chosenChains);
    updateSubscription(user.id, level, chosenChains);
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="sub-type">
        <label htmlFor="sub-type-select"></label>
        <select
          name="sub-type"
          id="sub-type-select"
          onChange={handleSubTypeSelect}
        >
          <option value="''"></option>
          <option value="basic_level">Basic Level</option>
          <option value="level_two">Level Two</option>
          <option value="level_three">Level Three</option>
          <option value="level_four">Level Four</option>
          <option value="level_five">Level Five</option>
          <option value="premium_level">Premium Level</option>
        </select>
      </div>
      <div className="chosen-chains">
        <label htmlFor="chain-select"></label>
        <select
          name="chosen-chain"
          id="chain-select"
          onChange={handleChainSelect}
        ></select>
      </div>
      <div className="submit-container">
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
