import { VictoryScatter, VictoryChart, VictoryTheme, VictoryTooltip } from "victory";

export default function AreaChart({ max_x, max_y, consumoAverage, data }) {
    if(data){
        const dataChart = data;
        const dataMax_x = max_x;
        const dataMax_y = max_y;
        const dataConsumoAverage = consumoAverage;
        console.log(dataChart);    
        console.log(dataMax_x);       
        console.log(dataMax_y);    
        return (
            <div>
                <VictoryChart
                  width={1520} height={710}
                  theme={VictoryTheme.material}
                  domain={{ x: [0, dataMax_x], y: [0, dataMax_y] }}
                >
                  <VictoryScatter
                    labelComponent={<VictoryTooltip/>}
                    style={{ data: { fill: ({ datum }) => datum.y > dataConsumoAverage
                    ? "#FF0000"
                    : "#000CFE" } }}
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
        <span>Não há lojas cadastradas.</span>
      </div>
    );
    }
}
