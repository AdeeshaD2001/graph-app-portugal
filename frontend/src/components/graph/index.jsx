import { VictoryScatter, VictoryChart } from "victory";

export default function AreaChart({ maxDomain, width, height, data }) {
    if(data){
        const dataChart = data;
        console.log(dataChart);       
        return (
            <div>
                <VictoryChart >
                  <VictoryScatter />
                </VictoryChart>    
            </div>
            
        )
    }   
  return (
    <div>
      <span>Não há lojas cadastradas.</span>
    </div>
  );
}
