import { VictoryScatter, VictoryChart, VictoryTheme, VictoryTooltip } from "victory";

export default function AreaChart({ max_x, max_y, consumoAverage, data, subscriptionType}) {
    if(data){
        const dataChart = data;
        const dataMax_x = max_x;
        const dataMax_y = max_y;
        const dataConsumoAverage = consumoAverage;
        const dataSubscriptionType = subscriptionType;
        console.log(dataChart);    
        console.log(dataMax_x);       
        console.log(dataMax_y);   
        if(dataSubscriptionType != 'basic_level') {
          return (
            <div>
                <VictoryChart
                  width={1200} height={710}
                  theme={VictoryTheme.material}
                  domain={{ x: [0, dataMax_x], y: [0, dataMax_y] }}
                >
                  <VictoryScatter
                    labelComponent={<VictoryTooltip/>}
                    style={{ 
                      data: { fill: ({ datum }) => datum.y > dataConsumoAverage
                          ? "#FF0000"
                          : "#000CFE",
                      },
                      labels: {
                        fontSize: 10
                      }
                     }}
                    size={7}
                    data={dataChart}
                  />
                </VictoryChart>   
            </div>
          )
        }
        else {
          return (
            <div>
                <VictoryChart
                  width={1200} height={710}
                  theme={VictoryTheme.material}
                  domain={{ x: [0, dataMax_x], y: [0, dataMax_y] }}
                >
                  <VictoryScatter
                    labelComponent={<VictoryTooltip/>}
                    style={{ 
                      data: { fill: ({ datum }) => datum.y > dataConsumoAverage
                          ? "#FF0000"
                          : "#000CFE",
                          fillOpacity: ({ datum }) => datum.y != dataMax_y
                          ? 0.2
                          : 1
                      },
                      labels: {
                          fillOpacity: ({ datum }) => datum.y != dataMax_y
                            ? 0.01
                            : 1 ,
                          fontSize: ({ datum }) => datum.y != dataMax_y
                          ? 1
                          : 10 
                      }
                     }}
                    size={7}
                    data={dataChart}
                  />
                </VictoryChart>   
            </div>
          )

        }
    }   
    else {
      return (
      <div>
        <span>Não há lojas cadastradas.</span>
      </div>
    );
    }
}
