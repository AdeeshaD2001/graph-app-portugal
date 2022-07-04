import React, { useState } from "react";
import { useEffect,useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { getAllGraphs, updateSubscription } from "../../services/api";

const CheckoutPage = () => {
  const chainNames = []; // array to hold the chain names chosen by the user 
  let level = ""; // variable to hold the access level.

  const {currentUser, setUser} = useContext(AuthContext);
  console.log(currentUser);
  if (!currentUser) {
    let storedUser = JSON.parse(localStorage.getItem('user')); 
    setUser(storedUser);
  }

  const getChains = async () => {
    let res = await getAllGraphs(); // get all the chain data from the backend. data
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
    // const userJSON = localStorage.getItem("user"); // get the data of the current user stored in the localStorage.
    // const user = JSON.parse(userJSON);// parse the JSON to create the user object
    const allChains = []; // array to hold all the chain objects available.
    // console.log(user); 
    

    getChains().then((chains) => { // use the async function to get all the chain data from the backend.
      chains.forEach((chain) => {
        allChains.push(chain); // push each chain object into the array
      });
      console.log(allChains);
      localStorage.setItem("allChains", JSON.stringify(allChains));// store all the chain data in the localStorage.
      generateChainSelect();
    });
  }, []);

  

  const handleSubTypeSelect = () => {
    level = document.querySelector("#sub-type-select").value; // get the access level chosen by the user.
    console.log(level);
    let allChains = JSON.parse(localStorage.getItem("allChains")); // get all the chain objects from the localStorage.
    while(chainNames.length > 0) {
      chainNames.pop(); // clear the previously selected chain names if there are any.
    }
    if (level === "premium_level") { // for a user with premium_level access provide all the chains to the chainNames array.
      allChains.forEach((chain) => {
        chainNames.push(chain.cadeia_nome);
      });
      document.querySelector("#chain-select").style.display = "none";// hide the chain select since the user has all the chains.
    }else{
      document.querySelector("#chain-select").style.display = "block";// show the chain select if user changes the access level.
    }
  };

  const handleChainSelect = () => {
    
    // lets users select chains according to their access level.
    if (
      level === "basic_level" ||
      level === "level_two" ||
      level === "level_three"
    ) {
      if (chainNames.length < 1) {
        chainNames.push(document.querySelector("#chain-select").value);
      } else {
        chainNames[0] = document.querySelector("#chain-select").value;// allow only one chain to be selected for the user.
      }
    } else if (level === "level_four" || level === "level_five") {
      if (chainNames.length < 3) {
        chainNames.push(document.querySelector("#chain-select").value);// allow upto three chains to be selected.
      } else {
        console.log("You can only select three chains");
      }
    } else {
    
    }

    console.log(chainNames);
  };

  const handleSubmit = () => {
    // const userJSON = localStorage.getItem("user");// when a user submits the data get the user JSON from localStorage.
    // const user = JSON.parse(userJSON); // get the user object.
    let allChains = JSON.parse(localStorage.getItem("allChains")); // get the list of all chains in the localStorage.
    let chosenChains = [];
    allChains.forEach(obj => {
      chainNames.forEach(chain =>{
         if (obj.cadeia_nome === chain){
          chosenChains.push(obj._id) // create a chosenChains array which is an array of document ids of the chosen chains.
      }
      })
      
    });
    console.log(currentUser.id);
    console.log(level);
    console.log(chosenChains);
    // calls the axios method to update the user document with the subscription data.
    updateSubscription(currentUser.id, level, chosenChains)
    .then(response => { console.log('subscribedUser', response); alert('You have been subscribed!\n'+JSON.stringify(response)); })
    .catch(error =>  { console.log('subscribedUser', error.message); alert('Subscription failed\nError: '+error.message); });
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
      <div className="submit-container">
        <p>
        </p>
      </div>
    </div>
  );
  };
export default CheckoutPage;
