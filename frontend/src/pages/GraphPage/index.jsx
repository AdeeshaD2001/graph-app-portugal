import React, { useState, useEffect, useContext } from 'react';
import './styles.scss';
import AreaChart from '../../components/graph';
import Search from '../../components/search';
import { getData, updateVisitorId } from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import FingerprintJS from '@fingerprintjs/fingerprintjs'



const GraphPage = () => {
    const fpPromise = FingerprintJS.load();
    const {user, logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();         
    }
    const handleSearch = (query) =>{
        console.log(query);
        let current_user = JSON.parse(localStorage.getItem('user'));
        console.log(current_user);
        getData(current_user.id, query).then(response => {
            console.log(response.data.chosenChains);
        });
    }
    
    //const userId = '624a2f39509a9db8529cd24a';

    const [graphs, setGraphs] = useState([]);

    const dataChart = async (query = '') => {
        try{

            let current_user = JSON.parse(localStorage.getItem('user'));
            console.log(current_user);
            const response = await getData(current_user.id);
            console.log(response);
            setGraphs(response.data.chosenChains);
            if (response.data.subscriptionType === 'basic_level') {
                const fp = await fpPromise;
                const result = await fp.get();
                updateVisitorId(current_user.id, result.visitorId);
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