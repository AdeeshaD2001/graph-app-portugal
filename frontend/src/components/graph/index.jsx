import {
  VictoryScatter,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
} from "victory";

import "./graph.styles.scss";

export default function AreaChart({
  max_x,
  max_y,
  consumoAverage,
  data,
  subscriptionType,
}) {
  if (data) {
    const dataChart = data;
    const dataMax_x = max_x;
    const dataMax_y = max_y;
    const dataConsumoAverage = consumoAverage;
    const dataSubscriptionType = subscriptionType;
    console.log(dataChart);
    console.log(dataMax_x);
    console.log(dataMax_y);
    if (dataSubscriptionType != "basic_level") {
      return (
        <div className="graph-container">
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
                    stroke: "white",
                    fill:  "url(#tooltip-gradient)"
                }}
                />}
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
                  fontFamily:"Anek Latin"
                },
              }}
              size={5}
              data={dataChart}
            />
          </VictoryChart>
        </div>
      );
    } else {
      return (
        <div  className="graph-container">
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
                  stroke: "none",
                  fill:  "url(#tooltip-gradient)"
              }}
              />}
              style={{
                data: {
                  fill: ({ datum }) =>
                    datum.y > dataConsumoAverage ?  "url(#myGradient)" :  "url(#myGradient2)",
                  fillOpacity: ({ datum }) => (datum.y != dataMax_y ? 0.2 : 1),
                },

                labels: {
                  fontSize: 10,
                  fontFamily:"Anek Latin",
                  fill: "white",
                  
                },
              }}
              size={5}
              data={dataChart}
              

            />
          </VictoryChart>
        </div>
      );
    }
  } else {
    return (
      <div>
        <span>Não há lojas cadastradas.</span>
      </div>
    );
  }
}
