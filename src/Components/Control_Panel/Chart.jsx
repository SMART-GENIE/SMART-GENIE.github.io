import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./Chart.css";
function Chart(){
    const data = [
        {
          name: 'D1',
          Referrals: 9,
        },
        {
          name: 'D2',
          Referrals: 5,
        },
        {
          name: 'D3',
          Referrals: 7,
        },
        {
          name: 'D4',
          Referrals: 9,
        },
        {
          name: 'D5',
          Referrals: 5,
        },
        {
          name: 'D6',
          Referrals: 11,
        },
        {
          name: 'D7',
          Referrals: 3,
        },
        {
            name: 'D8',
            Referrals: 3,
        },
        {
            name: 'D9',
            Referrals: 14,
        },
        {
            name: 'D10',
            Referrals: 15,
        },
        {
            name: 'D11',
            Referrals: 17,
        },
        {
            name: 'D12',
            Referrals: 15,
        },
        {
            name: 'D13',
            Referrals: 2,
        },
      ];
    return(
        <div className="chartclass">
        <ResponsiveContainer >
        <LineChart className="line"
          
          data={data}
        >
          <CartesianGrid horizontal="true" vertical="true"/>
          <XAxis dataKey="name" />
          <YAxis startOffset={2} tickCount={10} start/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Referrals" stroke="blue" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      </div>

    )
}

export default Chart;