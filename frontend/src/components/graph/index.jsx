import { Fragment, Component } from "react";
import {
  VictoryScatter,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryAxis,
  VictoryLabel,
  VictoryHistogram,
  VictoryBar
} from "victory";

import "./graph.styles.scss";



export default function AreaChart({
  max_x,
  max_y,
  consumoAverage,
  data,
  subscriptionType,
  selectedChainName,
  isScatter,
}) {
  if (data  && subscriptionType != null) {// only show charts if data is available and the user has a access level.
    const dataChart = data;
    const dataMax_x = max_x;
    const dataMax_y = max_y;
    const dataConsumoAverage = consumoAverage;
    const dataSubscriptionType = subscriptionType;
    const dataChainName = selectedChainName;
    const dataIsScatter = isScatter;
    //above props are passed from the GraphPage component

    if (dataIsScatter) {//checks whether the current graph mode is Scatter and run code block to show a scatter chart component
      
      if (dataSubscriptionType != "basic_level") {// checks whether the user has a higher access level than the basic_level
        return (
          <div className="graph-container">
            <div className="graph-name-container">

              <span id="graph-name">{dataChainName}</span>
            </div>
            <svg style={{ height: 0 }}>
              <defs>
              <linearGradient id="myGradient">
                <stop offset="0%" stopColor="#ee0979" />
                {/* <stop offset="25%" stopColor="orange"/>
        <stop offset="50%" stopColor="gold"/>
        <stop offset="75%" stopColor="yellow"/> */}
                <stop offset="100%" stopColor="#ff6a00" />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="myGradient2">
                <stop offset="0%" stopColor="#00c6ff" />
                {/* <stop offset="25%" stopColor="orange"/>
        <stop offset="50%" stopColor="gold"/>
        <stop offset="75%" stopColor="yellow"/> */}
                <stop offset="100%" stopColor="#0072ff" />
              </linearGradient>
            </defs>
              <defs>
                <linearGradient id="tooltip-gradient">
                  <stop offset="0%" stopColor="#749e56 " />
  
                  <stop offset="100%" stopColor="#92b33e" />
                </linearGradient>
              </defs>
              <defs>
                <linearGradient id="text-gradient">
                  <stop offset="0%" stopColor="#f6f9f3" /> 
                  <stop offset="50%" stopColor="#d1ddc3" /> 
                  <stop offset="100%" stopColor="#f0ffc9" />
                </linearGradient>
              </defs>
            </svg>
  
            <VictoryChart
              width={800}
              height={400}
              theme={VictoryTheme.material}
              domain={{ x: [0, dataMax_x], y: [0, dataMax_y] }}
            >
              <VictoryScatter
                labelComponent={
                  <VictoryTooltip
                    
                    flyoutStyle={{
                      stroke: "#ffffff",
                      fill: "url(#tooltip-gradient)",
                      strokeWidth: 1.5
                    }}
                  />
                }
                style={{
                  data: {
                    fill: ({ datum }) =>
                      datum.y > dataConsumoAverage
                        ? "url(#myGradient)"
  
                        : "url(#myGradient2)",
                  },
                  labels: {
                    fill: "white",
                    fontSize: 10,
                    fontFamily: "Anek Latin",
                  },
                }}
                size={5}
                symbol = "square"
                data={dataChart}
              />
              <VictoryAxis
                label="Consumidores"
                style={{
                  axisLabel: {fontSize: 12.5, padding: 30, fill:"url(#text-gradient)"},
                  tickLabels: {fontSize: 10, padding: 5, fill: "url(#text-gradient)"},
                  axis: {stroke: "#ffffff"}
                }}
              />
              <VictoryAxis dependentAxis
                label="Consumo no Ambiete Livre Kwh/m^2"
                style={{
                  axisLabel: {fontSize: 12.5, padding: 37, fill: "url(#text-gradient)" },
                  tickLabels: {fontSize: 10, padding: 5, fill: "url(#text-gradient)"},
                  axis: {stroke: "#ffffff"}
                }}
                offsetX={50}
                tickFormat={(x) => (`${x / 1000}k`)}
              />
            </VictoryChart>
          </div>
        );
      } else {// show the scatter graph with limited data for a basic_level user  
        return (
          <div className="graph-container">
            <div className="graph-name-container">
                <span id="graph-name">{dataChainName}</span>
            </div>
            <svg style={{ height: 0 }}>
              <defs>
              <linearGradient id="myGradient">
                <stop offset="0%" stopColor="#ee0979" />
                {/* <stop offset="25%" stopColor="orange"/>
        <stop offset="50%" stopColor="gold"/>
        <stop offset="75%" stopColor="yellow"/> */}
                <stop offset="100%" stopColor="#ff6a00" />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="myGradient2">
                <stop offset="0%" stopColor="#00c6ff" />
                {/* <stop offset="25%" stopColor="orange"/>
        <stop offset="50%" stopColor="gold"/>
        <stop offset="75%" stopColor="yellow"/> */}
                <stop offset="100%" stopColor="#0072ff" />
              </linearGradient>              
              </defs>
              <defs>
                <linearGradient id="tooltip-gradient">
                  <stop offset="0%" stopColor="#749e56 " />
  
                  <stop offset="100%" stopColor="#92b33e" />
                </linearGradient>
              </defs>
              <defs>
                <linearGradient id="text-gradient">
                  <stop offset="0%" stopColor="#f6f9f3" /> 
                  <stop offset="50%" stopColor="#d1ddc3" /> 
                  <stop offset="100%" stopColor="#f0ffc9" />
                </linearGradient>
              </defs>
            </svg>
            <VictoryChart
              width={800}
              height={400}
              theme={VictoryTheme.material}
              domain={{ x: [0, dataMax_x], y: [0, dataMax_y] }}
            >
              <VictoryScatter
                labelComponent={
                  <VictoryTooltip
                    // center={{ x: 225, y: 30 }}
                    // pointerOrientation="bottom"
                    // flyoutWidth={150}
                    // flyoutHeight={50}
                    // pointerWidth={150}
                    // cornerRadius={0}
                    flyoutStyle={{
                      stroke: "#ffffff",
                      fill: "url(#tooltip-gradient)",
                      strokeWidth: 1.5
                    }}
                  />
                }
                style={{
                  data: {
                    fill: ({ datum }) =>
                      datum.y > dataConsumoAverage
                        ? "url(#myGradient)"
                        : "url(#myGradient2)",
                    fillOpacity: ({ datum }) => (datum.y != dataMax_y ? 0.2 : 1),
                  },
  
                  labels: {
                    fontSize: 10,
                    fontFamily: "Anek Latin",
                    fill: "white",
                  },
                }}
                size={5}
                symbol = "square"
                data={dataChart}
              />
              <VictoryAxis
                label="Consumidores"
                style={{
                  axisLabel: {fontSize: 12.5, padding: 30, fill:"url(#text-gradient)"},
                  tickLabels: {fontSize: 10, padding: 5, fill: "url(#text-gradient)"},
                  axis: {stroke: "#ffffff"}
                }}
              />
              <VictoryAxis dependentAxis
                label="Consumo no Ambiete Livre Kwh/m^2"
                style={{
                  axisLabel: {fontSize: 12.5, padding: 37, fill: "url(#text-gradient)" },
                  tickLabels: {fontSize: 10, padding: 5, fill: "url(#text-gradient)"},
                  axis: {stroke: "#ffffff"}
                }}
                offsetX={50}
                tickFormat={(x) => (`${x / 1000}k`)}
              />
            </VictoryChart>
          </div>
        );
      }
    }else{
      console.log('histogram');
      //similar structure only differnece is here, a bar chart is generated.
      if (dataSubscriptionType != "basic_level") {
        return (
          <div className="graph-container">
            <div className="graph-name-container">

              <span id="graph-name">{dataChainName}</span>
            </div>
            <svg style={{ height: 0 }}>
              <defs>
              <linearGradient id="myGradient">
                <stop offset="0%" stopColor="#ee0979" />
                <stop offset="100%" stopColor="#ff6a00" />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="myGradient2">
                <stop offset="0%" stopColor="#00c6ff" />
                <stop offset="100%" stopColor="#0072ff" />
              </linearGradient>              </defs>
              <defs>
                <linearGradient id="tooltip-gradient">
                  <stop offset="0%" stopColor="#749e56 " />
  
                  <stop offset="100%" stopColor="#92b33e" />
                </linearGradient>
              </defs>
              <defs>
                <linearGradient id="text-gradient">
                  <stop offset="0%" stopColor="#f6f9f3" /> 
                  <stop offset="50%" stopColor="#d1ddc3" /> 
                  <stop offset="100%" stopColor="#f0ffc9" />
                </linearGradient>
              </defs>
            </svg>
  
            <VictoryChart
              width={800}
              height={1600}
              theme={VictoryTheme.material}
              domain={{ x: [0, dataMax_x], y: [0, dataMax_y] }}
            >
              <VictoryBar
                labelComponent={
                  <VictoryTooltip
                    flyoutStyle={{
                      stroke: "#ffffff",
                      fill: "url(#tooltip-gradient)",
                      strokeWidth: 1.5
                    }}
                  />
                }
                style={{
                  data: {
                    fill: ({ datum }) =>
                      datum.y > dataConsumoAverage
                        ? "url(#myGradient)"
  
                        : "url(#myGradient2)",
                  },
                  labels: {
                    fill: "white",
                    fontSize: 10,
                    fontFamily: "Anek Latin",
                  },
                }}
                data={dataChart}
              />
              <VictoryAxis
                label="Consumidores"
                style={{
                  axisLabel: {fontSize: 12.5, padding: 30, fill:"url(#text-gradient)"},
                  tickLabels: {fontSize: 10, padding: 5, fill: "url(#text-gradient)"},
                  axis: {stroke: "#ffffff"}
                }}
              />
              <VictoryAxis dependentAxis
                label="Consumo no Ambiete Livre Kwh/m^2"
                style={{
                  axisLabel: {fontSize: 12.5, padding: 37, fill: "url(#text-gradient)" },
                  tickLabels: {fontSize: 10, padding: 5, fill: "url(#text-gradient)"},
                  axis: {stroke: "#ffffff"}
                }}
                offsetX={50}
                tickFormat={(x) => (`${x / 1000}k`)}
              />
            </VictoryChart>
          </div>
        );
      } else {
        return (
          <div className="graph-container">
            <div className="graph-name-container">
                <span id="graph-name">{dataChainName}</span>
            </div>
            <svg style={{ height: 0 }}>
              <defs>
              <linearGradient id="myGradient">
                <stop offset="0%" stopColor="#ee0979" />
                {/* <stop offset="25%" stopColor="orange"/>
        <stop offset="50%" stopColor="gold"/>
        <stop offset="75%" stopColor="yellow"/> */}
                <stop offset="100%" stopColor="#ff6a00" />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="myGradient2">
                <stop offset="0%" stopColor="#00c6ff" />
                {/* <stop offset="25%" stopColor="orange"/>
        <stop offset="50%" stopColor="gold"/>
        <stop offset="75%" stopColor="yellow"/> */}
                <stop offset="100%" stopColor="#0072ff" />
              </linearGradient>
              </defs>
           
              <defs>
                <linearGradient id="tooltip-gradient">
                  <stop offset="0%" stopColor="#749e56 " />
  
                  <stop offset="100%" stopColor="#92b33e" />
                </linearGradient>
              </defs>
              <defs>
                <linearGradient id="text-gradient">
                  <stop offset="0%" stopColor="#f6f9f3" /> 
                  <stop offset="50%" stopColor="#d1ddc3" /> 
                  <stop offset="100%" stopColor="#f0ffc9" />
                </linearGradient>
              </defs>
            </svg>
            <VictoryChart
              width={800}
              height={1600}
              theme={VictoryTheme.material}
              domain={{ x: [0, dataMax_x], y: [0, dataMax_y] }}
            >
              <VictoryBar
                labelComponent={
                  <VictoryTooltip
                    // center={{ x: 225, y: 30 }}
                    // pointerOrientation="bottom"
                    // flyoutWidth={150}
                    // flyoutHeight={50}
                    // pointerWidth={150}
                    // cornerRadius={0}
                    flyoutStyle={{
                      stroke: "#ffffff",
                      fill: "url(#tooltip-gradient)",
                      strokeWidth: 1.5
                    }}
                  />
                }
                style={{
                  data: {
                    fill: ({ datum }) =>
                      datum.y > dataConsumoAverage
                        ? "url(#myGradient)"
                        : "url(#myGradient2)",
                    fillOpacity: ({ datum }) => (datum.y != dataMax_y ? 0.2 : 1),
                  },
  
                  labels: {
                    fontSize: 10,
                    fontFamily: "Anek Latin",
                    fill: "white",
                  },
                }}
                data={dataChart}
              />
              <VictoryAxis
                label="Consumidores"
                style={{
                  axisLabel: {fontSize: 12.5, padding: 30, fill:"url(#text-gradient)"},
                  tickLabels: {fontSize: 10, padding: 5, fill: "url(#text-gradient)"},
                  axis: {stroke: "#ffffff"}
                }}
              />
              <VictoryAxis dependentAxis
                label="Consumo no Ambiete Livre Kwh/m^2"
                style={{
                  axisLabel: {fontSize: 12.5, padding: 37, fill: "url(#text-gradient)" },
                  tickLabels: {fontSize: 10, padding: 5, fill: "url(#text-gradient)"},
                  axis: {stroke: "#ffffff"}
                }}
                offsetX={50}
                tickFormat={(x) => (`${x / 1000}k`)}
              />
            </VictoryChart>
          </div>
        );
      }
    }
  } else { // When there is no data or the user acccess level is removed. Don't show any graphs
    return (
      <Fragment>
        <div className="no-lojas">
          <span>Não há lojas cadastradas.</span>
        </div>
      </Fragment>
    );
  }
}
