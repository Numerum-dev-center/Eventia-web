import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RevenueChart({ data, metric }) {
  const metricConfig = {
    revenue: {
      title: "Évolution des revenus",
      dataKey: "revenue",
      color: "#f97316",
    },

    users: {
      title: "Évolution des inscrits",
      dataKey: "users",
      color: "#3b82f6",
    },

    checkins: {
      title: "Évolution des check-ins",
      dataKey: "checkins",
      color: "#10b981",
    },

    notes: {
      title: "Évolution des notes",
      dataKey: "notes",
      color: "#8b5cf6",
    },
  };

  const config =
    metricConfig[metric] || metricConfig.revenue;

  return (
    <div
      className="
        bg-white
        p-6
        rounded-2xl
        shadow
      "
    >
      <h2
        className="
          font-bold
          mb-5
          text-lg
        "
      >
        {config.title}
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <AreaChart data={data}>
          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey={config.dataKey}
            stroke={config.color}
            fill={config.color}
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;
