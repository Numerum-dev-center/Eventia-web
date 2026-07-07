
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function TicketPieChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">



<PieChart width={250} height={250}>
  <Pie
    data={data}
    innerRadius={60}
    outerRadius={90}
    dataKey="value"
  >
    <Cell fill="#FF7F32" />
    <Cell fill="#13142D" />
    <Cell fill="#EAEAEA" />
  </Pie>
</PieChart>


</div>
)
}; export default TicketPieChart;