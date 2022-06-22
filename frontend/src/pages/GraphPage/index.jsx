import React, { useState, useEffect, useContext } from 'react';
import './styles.scss';
import AreaChart from '../../components/graph';
import Search from '../../components/search';
import { getData, updateVisitorId } from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import FingerprintJS from '@fingerprintjs/fingerprintjs'



const GraphPage = () => {
    const fpPromise = FingerprintJS.load(); // initialize fingerprintjs service.
    const {user, logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();         
    }
    const handleSearch = (query) =>{// function to run when a user submits the search.
        console.log(query);
        let current_user = JSON.parse(localStorage.getItem('user'));// gets the current user from localStorage.
        console.log(current_user);
        getData(current_user.id, query).then(response => {// request the corresponding data for the search query from the server.
            console.log(response.data.chosenChains);
        });
    }
    
    //const userId = '624a2f39509a9db8529cd24a';

    const [graphs, setGraphs] = useState([]);

    const dataChart = async (query = '') => {
        try{

            let current_user = JSON.parse(localStorage.getItem('user'));// gets the current user from localStorage.
            console.log(current_user);
            const response = await getData(current_user.id);// gets the data for the curent user from the server. 
            console.log(response);
            setGraphs(response.data.chosenChains);// update the graph variable with chain data from the server.
            if (response.data.subscriptionType === 'basic_level') {// for a user with basic level subscription provide a visitorId.
                const fp = await fpPromise;
                const result = await fp.get();
                updateVisitorId(current_user.id, result.visitorId);// make the server request to update the user's visitorId.
                return result.visitorId;
            }
        }
        catch(err){
            console.log(err);
        }
    }
    
    useEffect(()=>{
        
        // (async () => await dataChart())();
        dataChart().then(id =>{
            console.log('Graphs Has been fetched');
        });        
    },[]);
    
    return (
        <div id="main"> 
            <div className="title">
                <h1 className="tex">Gráfico</h1>
                <button onClick={handleLogout}>Sair</button>
            </div>
            <Search onSearch={handleSearch}/>
            <AreaChart maxDomain={7} width={1520} height={710} data={graphs} />
            
        </div> 
        );
}
 
export default GraphPage;