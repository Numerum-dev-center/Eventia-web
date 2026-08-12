import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const metricConfig = {
  revenue: { title: "Revenus", dataKey: "revenue", color: "#ff5c35" },
  users: { title: "Acheteurs", dataKey: "users", color: "#ff5c35" },
  checkins: { title: "Check-ins", dataKey: "checkins", color: "#ff5c35" },
  tickets: { title: "Billets vendus", dataKey: "users", color: "#ff5c35" },
};

function RevenueChart({ data = [], metric }) {
  const config = metricConfig[metric] || metricConfig.revenue;
  const source = data.length > 1 ? data : [
    { ...data[0], month: "Début", [config.dataKey]: 0 },
    { ...data[0], month: "Actuel" },
  ];

  return (
    <div className="db-chart-card">
      <div className="db-chart-head"><div><span>Évolution</span><h2>{config.title}</h2></div><i>Cette période</i></div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={source} margin={{ top: 15, right: 5, left: -20, bottom: 0 }}>
          <defs><linearGradient id="eventiaArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={config.color} stopOpacity={0.32} /><stop offset="100%" stopColor={config.color} stopOpacity={0} /></linearGradient></defs>
          <XAxis dataKey="month" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} /><Tooltip /><Area type="monotone" dataKey={config.dataKey} stroke={config.color} strokeWidth={3} fill="url(#eventiaArea)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;
