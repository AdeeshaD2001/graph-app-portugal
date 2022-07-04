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
  const { setUser} = useContext(AuthContext);
  console.log(currentUser);
  if (!currentUser) {
    let storedUser = JSON.parse(localStorage.getItem('user')); 
    setUser(storedUser);
  }

  let graphs = [];
  let selectedChain = "";
  let selectedGraph = null;
  const [selectedChainName, setSelectedChainName] = useState(null)
  const [subscriptionType, setSubscriptionType] = useState(null);
  const [data, setData] = useState(null);
  const [max_x, setMax_x] = useState(null);
  const [max_y, setMax_y] = useState(null);
  const [consumoAverage, setconsumoAverage] = useState(0);
  const [isScatter, setScatterOrHisto] = useState(true);
  const handleLogout = () => {
    logout();
  };

  const generateChainSelect = async function () {
    graphs = JSON.parse(localStorage.getItem("graphs"));
    console.log(graphs);
    let options = ``;
    graphs.forEach((chain) => {
      options += `<option value="${chain.cadeia_nome}">${chain.cadeia_nome}</option>`;
    });
    document.querySelector("#chain-list").innerHTML = options;
  };

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
    selectedChain = document.querySelector("#chain-select-input").value;
    if (!selectedChain) return;
    // document.querySelector('#graph-name').innerText = `${document.querySelector("#chain-select-input").value}`;

    console.log(selectedChain);
    graphs = JSON.parse(localStorage.getItem("graphs"));
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

  //const userId = '624a2f39509a9db8529cd24a';

  //const [graphs, setGraphs] = useState([]);

  const dataChart = async (query = "") => {
    try {
      // let current_user = JSON.parse(localStorage.getItem("user")); // gets the current user from localStorage.
      // console.log(current_user);
      const response = await getData(currentUser.id); // gets the data for the curent user from the server.
      console.log(response);
      localStorage.setItem(
        "graphs",
        JSON.stringify(response.data.chosenChains)
      );
      const settingcSubscriptionType = () => {
        setSubscriptionType(response.data.subscriptionType);
      };
      settingcSubscriptionType();
      //setGraphs(response.data.chosenChains);// update the graph variable with chain data from the server.
      if (response.data.subscriptionType === "basic_level") {
        // for a user with basic level subscription provide a visitorId.
        const fp = await fpPromise;
        const result = await fp.get();
        updateVisitorId(currentUser.id, result.visitorId); // make the server request to update the user's visitorId.
        return result.visitorId;
      }
      console.log(graphs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // (async () => await dataChart())();
    dataChart().then(() => {
      console.log("Graphs Has been fetched");
      generateChainSelect();
    });
  }, []);

  const switchGraphMode = () => {
    setScatterOrHisto(!isScatter) 
  }

  return (
    <div id="main">
      <Search handleLogout={handleLogout} switchGraphMode={switchGraphMode} isScatter={isScatter} handleSubmit={handleSubmit} />
      <AreaChart
        max_x={max_x}
        max_y={max_y}
        consumoAverage={consumoAverage}
        data={data}
        subscriptionType={subscriptionType}
        isScatter={isScatter}
        selectedChainName = {selectedChainName}
      />
    </div>
  );
};
////

export default GraphPage;
