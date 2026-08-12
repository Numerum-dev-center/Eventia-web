import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function TicketPieChart({ data = [] }) {
  const current = data[0] || {};
  const chartData = [
    { name: "Billets", value: Number(current.users || 0) },
    { name: "Check-ins", value: Number(current.checkins || 0) },
  ];
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) chartData.push({ name: "En attente", value: 1 });

  return (
    <div className="db-chart-card db-ticket-chart">
      <div className="db-chart-head"><div><span>Participation</span><h2>Billets & entrées</h2></div><i>Temps réel</i></div>
      <div className="db-donut-wrap">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={chartData} innerRadius={66} outerRadius={91} paddingAngle={4} dataKey="value" stroke="none">
              <Cell fill="#ff5c35" /><Cell fill="#191716" /><Cell fill="#e8e3dd" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="db-donut-center"><strong>{current.users ?? 0}</strong><span>billets</span></div>
      </div>
      <div className="db-chart-legend"><span><i className="orange" /> Vendus</span><span><i className="dark" /> Scannés</span></div>
    </div>
  );
}

export default TicketPieChart;
