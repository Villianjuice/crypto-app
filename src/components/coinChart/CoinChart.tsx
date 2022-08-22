import React from 'react'
import { Line } from 'react-chartjs-2';

import { SelectButton } from '../../composables';
import { chartDays } from '../../config/data';
import { useCryptoContext } from '../../context/CryptoContext';
import { IChart } from '../../types/types';

interface CoinChartProps {
  chart: IChart
}

export const CoinChart: React.FC <CoinChartProps> = ({chart}) => {
  const {currency, days} = useCryptoContext()
  return (
    <>
      <Line 
        data={{
          labels: chart.prices.map((coin) => {
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),

          datasets: [
            {
              data: chart.prices.map((coin) => coin[1]),
              label: `Price ( Past ${days} Days ) in ${currency}`,
              borderColor: "#EEBC1D",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />
      <div 
        style={{
        display: "flex",
        marginTop: 20,
        justifyContent: "space-around",
        width: "100%",
      }}>
        {chartDays.map(day => 
          <SelectButton day={day} selected={day.value === days} key={day.value} />
        )}
      </div>
    </>
    
  )
}
