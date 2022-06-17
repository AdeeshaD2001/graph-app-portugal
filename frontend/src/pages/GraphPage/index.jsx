import React, { useState, useEffect, useContext } from 'react';
import './styles.scss';
import AreaChart from '../../components/graph';
import Search from '../../components/search';
import { getData } from '../../services/api';
import { AuthContext } from '../../contexts/auth';


const GraphPage = () => {
    const {user, logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();         
    }
    const handleSearch = () =>{
        console.log('Buscou!')
    }
    
    //const userId = '624a2f39509a9db8529cd24a';

    const [graphs, setGraphs] = useState([]);

    const dataChart = async (query = '') => {
        const response = await getData(user?.id);
        setGraphs(response.data);
    }
    
    // useEffect(()=>{
    //     (async () => await dataChart())();        
    // },[]);
    
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