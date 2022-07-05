import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import AreaChart from "../../components/graph";
import Search from "../../components/search";
import { getData, updateVisitorId } from "../../services/api";
import { AuthContext } from "../../contexts/auth";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const GraphPage = () => {
  const fpPromise = FingerprintJS.load(); // initialize fingerprintjs service.
  const { currentUser, logout } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);
  console.log(currentUser);

  let selectedChain = "";
  let selectedGraph = null;
  const [selectedChainName, setSelectedChainName] = useState(null);
  const [subscriptionType, setSubscriptionType] = useState(null);
  const [data, setData] = useState(null);
  const [max_x, setMax_x] = useState(null);
  const [max_y, setMax_y] = useState(null);
  const [consumoAverage, setconsumoAverage] = useState(0);
  const [isScatter, setScatterOrHisto] = useState(true);
  const [graphs, setGraphs] = useState([]);
  const [expand, setExpand] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("graphs");
    logout();
  };

  const generateChainSelect = async function () {
    // generates chain name dropdown using the cadeia_nome fetched from the server.
    console.log(graphs);
    let options = ``;
    graphs.forEach((chain) => {
      options += `<option value="${chain.cadeia_nome}">${chain.cadeia_nome}</option>`;
    });
    document.querySelector("#chain-list").innerHTML = options;
  };

  useEffect(() => {
    // genertates the chain name dropdown when server actually loads the chain names.
    if (graphs) {
      console.log(graphs);
      generateChainSelect();
    }
  }, [graphs]);

  // When current user is set initiate the process to fetch chains from the server.
  useEffect(() => {
  
    if (currentUser) {
      
      getData(currentUser.id).then((response) => {
        console.log(response);
        if (response.data.chosenChains) {
          
          setGraphs(response.data.chosenChains);
        }
        if (response.data.subscriptionType) {
          const settingcSubscriptionType = () => {
            setSubscriptionType(response.data.subscriptionType);
          };
          settingcSubscriptionType();
        }
      });
    }
  }, [currentUser]);


  const generateChart = () => {
    console.log(selectedChain);
    let nMax_y = 0;
    let consumoTotal = 0;
    const calcMax = () => {
      selectedChain.lojas.forEach((loja) => {
        if (loja.consumo > nMax_y) {
          nMax_y = loja.consumo;
        }
        consumoTotal = consumoTotal + loja.consumo;
      });
    };
    calcMax();

    const plotData = selectedChain.lojas.map((loja, i) => {
      if (subscriptionType === "basic_level") {
        if (loja.consumo === nMax_y) {
          return {
            x: i + 1,
            y: loja.consumo,
            label: `consumo = ${loja.consumo}\n codcarga = ${loja.codcarga}\n endereco = ${loja.endereco}`,
          };
        } else {
          return {
            x: i + 1,
            y: loja.consumo,
            label: `Please Upgrade Your Subscription.`,
          };
        }
      } else {
        return {
          x: i + 1,
          y: loja.consumo,
          label: `consumo = ${loja.consumo}\n codcarga = ${loja.codcarga}\n endereco = ${loja.endereco}`,
        };
      }
    });
    console.log(plotData);
    // let nMax_y = plotData[0].y;
    let nMax_x = plotData[plotData.length - 1].x;

    let nConsumoAverage = consumoTotal / nMax_x;
    console.log(nMax_x);
    console.log(nMax_y);
    const settingSelectedChainName = () => {
      setSelectedChainName(selectedChain.cadeia_nome);
    };
    const settingData = () => {
      setData(plotData);
    };
    const settingMax_x = () => {
      setMax_x(nMax_x);
    };
    const settingMax_y = () => {
      setMax_y(nMax_y);
    };
    const settingcConsumoAverage = () => {
      setconsumoAverage(nConsumoAverage);
    };
    settingSelectedChainName();
    settingData();
    settingMax_x();
    settingMax_y();
    settingcConsumoAverage();
  };

  const handleSubmit = () => {
    // dashboard is expanded when no chain in selected. remove expansion when a chain is selected. 
    if (expand) {
      setExpand(!expand);
    }
    if (subscriptionType === "basic_level") {
      // for a user with basic level subscription provide a visitorId.
      fpPromise
        .then((fp) => {
          return fp.get();
        })
        .then((result) => {
          updateVisitorId(currentUser.id, result.visitorId); // make the server request to update the user's visitorId.
        });
      
    }

    // gets user input value from select element
    selectedChain = document.querySelector("#chain-select-input").value;
    if (!selectedChain) return;
    
    console.log(selectedChain);
    graphs.forEach((chain) => {
      if (selectedChain === chain.cadeia_nome) {
        selectedChain = chain;
      }
    });
    generateChart(selectedChain);
    clearInput();
  };

  const clearInput = () => {
    document.querySelector("#chain-select-input").value = "";
  };

  // function that runs on component mount to initiate setting user data 
  const dataChart = async (query = "") => {
    try {
      
      if (!currentUser) {
        let storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // run a function to set user data on component mount.
    dataChart().then(() => {
      console.log("Graphs Has been fetched");
    });
  }, []);

  const switchGraphMode = () => { //Function that toggles the graph mode between Scatter and Bar chart.
    setScatterOrHisto(!isScatter);
  };

  return (
    <div id="main" className={expand?'expand':''}>
      <Search
        handleLogout={handleLogout}
        switchGraphMode={switchGraphMode}
        isScatter={isScatter}
        handleSubmit={handleSubmit}
      />
      <AreaChart
        max_x={max_x}
        max_y={max_y}
        consumoAverage={consumoAverage}
        data={data}
        subscriptionType={subscriptionType}
        isScatter={isScatter}
        selectedChainName={selectedChainName}
      />
    </div>
  );
};
////

export default GraphPage;
