import { Fragment, Component } from "react";
import {
  VictoryScatter,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryAxis,
  VictoryLabel
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
  if (data) {
    const dataChart = data;
    const dataMax_x = max_x;
    const dataMax_y = max_y;
    const dataConsumoAverage = consumoAverage;
    const dataSubscriptionType = subscriptionType;
    const dataChainName = selectedChainName;
    const dataIsScatter = isScatter;
    

    if (dataIsScatter) {
      
      if (dataSubscriptionType != "basic_level") {
        return (
          <div className="graph-container">
            <div className="graph-name-container">

              <span id="graph-name">{dataChainName}</span>
            </div>
            <svg style={{ height: 0 }}>
              <defs>
                <linearGradient id="myGradient">
                  <stop offset="0%" stopColor="#72a357" />
                   <stop offset="40%" stopColor="#EB4747"/>
         
          <stop offset="60%" stopColor="#EB4747"/> 
                  <stop offset="100%" stopColor="#72a357" />
                </linearGradient>
              </defs>
              <defs>
                <linearGradient id="myGradient2">
                  <stop offset="0%" stopColor="#72a357" />
                   <stop offset="40%" stopColor="#0072ff"/>
         
          <stop offset="60%" stopColor="#0072ff"/> 
                  <stop offset="100%" stopColor="#72a357" />
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
      } else {
        return (
          <div className="graph-container">
            <div className="graph-name-container">
                <span id="graph-name">{dataChainName}</span>
            </div>
            <svg style={{ height: 0 }}>
              <defs>
                <linearGradient id="myGradient">
                  <stop offset="0%" stopColor="#72a357" />
                   <stop offset="40%" stopColor="#EB4747"/>
         
          <stop offset="60%" stopColor="#EB4747"/> 
                  <stop offset="100%" stopColor="#72a357" />
                </linearGradient>
              </defs>
              <defs>
                <linearGradient id="myGradient2">
                  <stop offset="0%" stopColor="#72a357" />
                   <stop offset="40%" stopColor="#0072ff"/>
         
          <stop offset="60%" stopColor="#0072ff"/> 
                  <stop offset="100%" stopColor="#72a357" />
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
                      stroke: "#2f7fa6",
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
      
    }
    
  } else {
    return (
      <Fragment>
        <div className="no-lojas">
          <span>Não há lojas cadastradas.</span>
        </div>
      </Fragment>
    );
  }
}
