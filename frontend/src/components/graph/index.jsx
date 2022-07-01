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
  selectedChainName
}) {
  if (data) {
    const dataChart = data;
    const dataMax_x = max_x;
    const dataMax_y = max_y;
    const dataConsumoAverage = consumoAverage;
    const dataSubscriptionType = subscriptionType;
    const dataChainName = selectedChainName;
    
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
                axisLabel: {fontSize: 12.5, padding: 30, fill: "#92b33e"},
                tickLabels: {fontSize: 10, padding: 5, fill: "#92b33e"}
              }}
            />
            <VictoryAxis dependentAxis
              label="Consumo no Ambiete Livre Kwh/m^2"
              style={{
                axisLabel: {fontSize: 12.5, padding: 37, fill: "#92b33e" },
                tickLabels: {fontSize: 10, padding: 5, fill: "#92b33e"}
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
                axisLabel: {fontSize: 12.5, padding: 30, fill: "#92b33e"},
                tickLabels: {fontSize: 10, padding: 5, fill: "#92b33e"}
              }}
            />
            <VictoryAxis dependentAxis
              label="Consumo no Ambiete Livre Kwh/m^2"
              style={{
                axisLabel: {fontSize: 12.5, padding: 37, fill: "#92b33e" },
                tickLabels: {fontSize: 10, padding: 5, fill: "#92b33e"}
              }}
              offsetX={50}
              tickFormat={(x) => (`${x / 1000}k`)}
            />
          </VictoryChart>
        </div>
      );
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
