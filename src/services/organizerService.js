export const getOrganizerDashboard = async () => {
  return {
    events: 12,
    tickets: 350,
    users: 280,
    revenue: 1250000,
    chart: [
      { month: "Jan", revenue: 100000 },
      { month: "Fév", revenue: 150000 },
      { month: "Mar", revenue: 250000 },
      { month: "Avr", revenue: 300000 },
      { month: "Mai", revenue: 450000 },
    ],
  };
};