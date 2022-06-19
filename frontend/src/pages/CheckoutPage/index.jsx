import React, {useState} from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';

const CheckoutPage = () => {
    const [user, setUser] = useState(null);
    const chosenChains = []
    let level = '';

    useEffect(() => {
        const userJSON = localStorage.getItem('user');
        const user = JSON.parse(userJSON);

        setUser(user);
        console.log(user);
        const chains = [{cadeia_nome: 'Amazon',cadeia_id:'65t436te5fdhfuel'}, {cadeia_nome: 'Walmart',cadeia_id:'65t436dhdh653khfuel'}]
    },[]);

    const handleSubTypeSelect = () => {
        level = document.querySelector('#sub-type-select').value;
        console.log(level);
    }

    const handleChainSelect = () => {
        chosenChains.push(document.querySelector('#chain-select').value);
        console.log(chosenChains);
    }

    const handleSubmit = () => {
        console.log(level);
        console.log(chosenChains);
    }

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <div className="sub-type">
                <label htmlFor="sub-type-select"></label>
                <select name="sub-type" id="sub-type-select" onChange={handleSubTypeSelect}>
                    <option value="''"></option>
                    <option value="basic-level">Basic Level</option>
                    <option value="level_two">Level Two</option>
                    <option value="level_three">Level Three</option>
                    <option value="level_four">Level Four</option>
                    <option value="level_five">Level Five</option>
                </select>
            </div>
            <div className="chosen-chains">
                <label htmlFor="chain-select"></label>
                <select name="chosen-chain" id="chain-select" onChange={handleChainSelect}>
                    <option value="''"></option>
                    <option value="Amazon">Amazon</option>
                    <option value="Walmart">Walmart</option>
                    <option value="BestBuy">BestBuy</option>
                    <option value="Keels">Keels</option>
                    <option value="Arpico">Arpico</option>
                </select>
            </div>
            <div className="submit-container">
                <button type="button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );

};

export default CheckoutPage;