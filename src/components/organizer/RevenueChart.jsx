import {
AreaChart,
Area,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";


function RevenueChart({data}){


return (

<div className="
bg-white
p-6
rounded-2xl
shadow
">


<h2 className="
font-bold
mb-5
">
Revenus
</h2>


<ResponsiveContainer
width="100%"
height={300}
>


<AreaChart data={data}>


<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>


<Area
type="monotone"
dataKey="revenue"
/>


</AreaChart>


</ResponsiveContainer>


</div>

)

}


export default RevenueChart;